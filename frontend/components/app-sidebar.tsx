"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Users, Home, Inbox, Settings, User, Wrench, CalendarCog, Globe, StickyNote, Archive, ChartColumn, ChartSpline, Boxes, UserCog, UserPen, FileText, FilePen } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  { title: "Interventions", url: "/tableau-interventions", icon: Wrench },
  { title: "Demandes", url: "/demande", icon: Inbox },
  { title: "Tableau Préventives", url: "/tableau-preventives", icon: CalendarCog },
  { title: "Clients", url: "/clients", icon: Globe },
  { title: "Sites", url: "/sites", icon: Home },
  { title: "Intervenants", url: "/intervenants", icon: UserPen },
  { title: "Mastore", url: "/mastore-equipe", icon: Users },
  { title: "Evictum", url: "/comptes-evictum", icon: UserCog  },
  { title: "Stocks", url: "/stocks", icon: Boxes },
  { title: "Factures", url: "/factures", icon: FileText },
  { title: "Devis", url: "/devis", icon: FilePen },
  { title: "Statistiques", url: "/statistiques", icon: ChartColumn },
  { title: "Performances", url: "/performances", icon: ChartSpline  },
  { title: "Archives", url: "/archives", icon: Archive },
  { title: "Parametres", url: "/parametres", icon: Settings },
];

export function AppSidebar() {
  // 🔍 Récupérer les informations utilisateur depuis Redux
  const authState = useSelector((state: RootState) => state.auth);
  const { isAuthentificated, firstname, lastname, entreprise, role, mail } = authState;

  // 🛠 Debug : Afficher l'état Redux dans la console
  useEffect(() => {
    console.log("📦 État Redux après connexion :", authState);
  }, [authState]);

  if (!isAuthentificated) return null; // Ne pas afficher si l'utilisateur n'est pas connecté

  return (
    <Sidebar>
      <SidebarContent>


        {/* ✅ Menu de navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
                {/* ✅ Section Profil Utilisateur */}
                <div className="flex flex-col gap-2 p-4 border-b border-gray-300 bg-gray-100 rounded-md">
          <div className="flex items-center gap-3">
            <User className="w-8 h-8 text-gray-700" />
            <div>
              <p className="text-md font-semibold">{firstname ?? "Prénom"} {lastname ?? "Nom"}</p>
              <p className="text-sm text-gray-600">{role ?? "Rôle inconnu"}</p>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
