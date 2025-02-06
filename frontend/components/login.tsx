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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {/* Champ Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d'utilisateur</FormLabel>
              <FormControl>
                <Input placeholder="ex: JohnDoe" {...field} />
              </FormControl>
              <FormDescription>Ceci est votre nom d'affichage.</FormDescription>
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
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bouton Submit */}
        <Button type="submit">
          {loading ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>
    </Form>
  );
}
