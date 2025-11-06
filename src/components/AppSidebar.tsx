import { Atom, Detective, Bank, Briefcase, CaretDown, Aperture, Users, Island, HandWaving, Table, Calendar, CaretDoubleUp, NewspaperClipping } from "@phosphor-icons/react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import "./AppSidebar.scss";
import { ROUTE_PATHS } from "@/constants/routePaths";

// Menu items.
const items = [
  // {
  //   section: "Human Resource Module",
  //   subSections: [
  //     {
  //       title: "HRMS",
  //       url: "#",
  //       icon: Briefcase,
  //       children: [
  //         {
  //           title: "Employees",
  //           url: "#",
  //           icon: Detective,
  //           children: []
  //         },
  //         {
  //           title: "Job Posting",
  //           url: "#",
  //           icon: Bank,
  //           children: []
  //         },
  //         {
  //           title: "OnBoarding",
  //           url: "#",
  //           icon: Briefcase,
  //           children: []
  //         },
  //         {
  //           title: "OffBoarding",
  //           url: "#",
  //           icon: HandWaving,
  //           children: []
  //         },
  //         {
  //           title: "Org Chart",
  //           url: "#",
  //           icon: Users,
  //           children: []
  //         },
  //         {
  //           title: "Leave Management",
  //           url: "#",
  //           icon: Island,
  //           children: []
  //         },
  //         {
  //           title: "Calendar",
  //           url: "#",
  //           icon: Calendar,
  //           children: []
  //         },
  //       ]


  //     },
      
  //   ]
  // },
  {
    section: "Web Forms",
    subSections: [
      {
        title: "Create Form",
        url: ROUTE_PATHS.WEB_FORMS.DASHBOARD,
        icon: Table,
        children: []
      },
      {
        title: "Newsletter",
        url: "",
        icon: NewspaperClipping,
        children: []
      }
    ]
  },
  {
    section: "Automations",
    subSections: [
      {
        title: "Flows",
        url: "",
        icon: Atom,
        children: [
          {
            title: "Integrations",
            url: "#",
            icon: Aperture
          },
          {
            title: "Create Visual Workflows",
            url: "/workflows",
            icon: Aperture
          }
        ]
      },
    ]
  }
]

export default function AppSidebar() {
  return (
    <SidebarProvider
      className="AppSidebar"
      style={{
        // "--sidebar-width": "15rem",
        // "--sidebar-width-mobile": "15rem",
      }}
    >
    <Sidebar
      collapsible="icon"
    >
      <SidebarHeader asChild>
        <div className="flex items-center gap-5 px-2">
          <img src="/swata.svg" alt="Swata Logo" className="w-10 h-10 inline-block align-center" />
          <h1 className="font-semibold text-lg leading-tight">Swata</h1>
        </div>
      </SidebarHeader>

      <hr />
      <SidebarContent>
        {items.map((item) => (
          <SidebarGroup>
            <SidebarGroupLabel>
              {item.section}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.subSections.map((subSection) => {
                  if (subSection.children.length === 0){
                  return (
                      <SidebarMenuItem key={subSection.title}>
                        <SidebarMenuButton asChild>
                          <a href={subSection.url}>
                            <subSection.icon size={36} color="#6c6a71" weight="fill" />
                            <span>{subSection.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  
                  } else {
                    return(
                      <Collapsible defaultOpen className="group/collapsible">
                        <CollapsibleTrigger>
                          <SidebarMenuItem key={subSection.title}>
                            <SidebarMenuButton>
                              <subSection.icon />
                              <span>{subSection.title}</span>
                              <CaretDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                              </SidebarMenuButton>
                          </SidebarMenuItem>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {subSection.children.map(child => (
                            <SidebarMenuSub>
                              <SidebarMenuSubItem key={child.title}>
                                <SidebarMenuSubButton key={child.title} asChild>
                                <a href={child.url}>
                                  <child.icon size={36} color="#6c6a71" weight="fill" />
                                  <span>{child.title}</span>
                                </a>

                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            </SidebarMenuSub>

                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    )
                  }
                
                
                }
                  
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
      <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                <Avatar className="rounded-lg">
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                Bivek Gyawali
                <CaretDoubleUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
    </SidebarProvider>
  )
}