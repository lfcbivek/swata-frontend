import { Atom, Detective, Bank, Briefcase, CaretDown, Aperture, Users, Island, HandWaving, Table, Calendar, CaretDoubleUp, Tray} from "@phosphor-icons/react";

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
import { useState } from "react";

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
        icon: <Table size={24} className="items-center" color="white" weight="fill" />,
        children: []
      },
      {
        title: "Inbox",
        url: "",
        icon: <Tray size={24} className="items-center" color="white" weight="fill"/>,
        children: []
      },
      {
        title: "Flows",
        url: "/workflows",
        icon: <Atom size={24} className="items-center" color="white" weight="fill"/>,
        children: [
        ]
      },
    ]
  },
]

export default function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <SidebarProvider
      className="AppSidebar"
      style={{
        "--sidebar-width": "65px",
        "--sidebar-width-icon": "65px",
        "--sidebar-width-mobile": "15rem"
      }}
    >
    <Sidebar
      collapsible="icon"
    >
      <SidebarHeader asChild>
        {isCollapsed && 
          <div className="flex items-center gap-5 px-2">
            {/* <img src="/swata.svg" alt="Swata Logo" className="w-18 h-20 inline-block align-center" /> */}
            <h1 className="font-semibold text-lg text-white leading-tight">SW</h1>
          </div>
        
      }
        {!isCollapsed && 
          <div className="flex items-center gap-5 px-2">
            <img src="/swata.svg" alt="Swata Logo" className="w-10 h-10 inline-block align-center" />
            <h1 className="font-semibold text-lg leading-tight">Swata</h1>
          </div>
        }
        
      </SidebarHeader>

      <SidebarContent>
        {items.map((item) => (
          <SidebarGroup>
            {!isCollapsed && 
              <SidebarGroupLabel>
                {item.section}
              </SidebarGroupLabel>
            }
            
            <SidebarGroupContent>
              <SidebarMenu>
                {item.subSections.map((subSection) => {
                  if (subSection.children.length === 0){
                  return (
                      <SidebarMenuItem key={subSection.title}>
                        <SidebarMenuButton asChild>
                          <a href={subSection.url} className="flex items-center justify-center">
                            {
                              isCollapsed && (<div>{subSection.icon} </div>)
                            }
                            {!isCollapsed && 
                              <div>
                                { subSection.icon }
                                <span>{subSection.title}</span>
                              </div>
                            }
                            
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
                              {/* <subSection.icon className="!w-[32px] !h-[72px]" color="white"/> */}
                              {!isCollapsed && 
                                <span>{subSection.title}</span>
                              }
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
                                  {child.icon}
                                  {!isCollapsed && 
                                    <span>{child.title}</span>
                                  }
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