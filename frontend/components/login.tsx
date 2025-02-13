'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { authUser } from "@/lib/features/authSlice";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { WavyBackground } from "./ui/wavy-background";

// Définition du schéma de validation avec Zod
const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Le nom d'utilisateur doit contenir au moins 2 caractères.",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
});

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthentificated, loading, error } = useSelector((state: RootState) => state.auth);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Gestion de l'envoi du formulaire
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("🔄 Tentative de connexion avec :", data);

    dispatch(authUser(data))
      .unwrap()
      .then((response) => {
        console.log("✅ Connexion réussie :", response);

      })
      .catch((err) => {
        console.error("❌ Erreur d'authentification :", err);
      });
  };

  // Suivi de l'état d'authentification via console.log
  useEffect(() => {
    if (isAuthentificated) {
      console.log("🟢 L'utilisateur est authentifié !");
    }
    if (error) {
      console.log("🔴 Une erreur est survenue :", error);
    }
  }, [isAuthentificated, error]);

  return (
    <WavyBackground className="max-w-4xl mx-auto pb-10">
      <div className="flex flex-col gap-8 items-center justify-center w-full max-w-md text-center border-spacing-1 shadow-xl p-8 bg-white rounded-lg">

      <Image src={'/mastore_logo.png'} alt="Mastore Logo" width={200} height={200} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center space-y-6">

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#002A46]">Nom d'utilisateur</FormLabel>
                <FormControl>
                  <Input placeholder="Mastore" className="w-[300px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#002A46]">Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" className="w-[300px]" placeholder="••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bouton Submit */}
          <Button className="bg-[#002A46] hover:bg-[#3A5BC7] w-[300px]" type="submit">
            {"Se connecter"}
          </Button>
            <p className="text-[#002A46] text-xs">© {new Date().getFullYear()} MASTORE. Tous droits réservés.</p>
        </form>
      </Form>
    </div>
    </WavyBackground>
  );
}
