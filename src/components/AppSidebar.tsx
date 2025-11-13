import { Atom, AddressBookIcon, MegaphoneIcon, CaretDown, Aperture, Users, Island, HandWaving, Table,  CaretDoubleUp, Tray} from "@phosphor-icons/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
import { Link } from "@tanstack/react-router"
import { useState } from "react";

// Menu items.
const items = [
  {
    section: "App Sidebar Menu",
    subSections: [
      {
        title: "Contacts",
        url: ROUTE_PATHS.WEB_FORMS.DASHBOARD,
        icon: <AddressBookIcon size={24} className="items-center" color="white" />,
        children: []
      },
      {
        title: "Campaigns",
        url: ROUTE_PATHS.WEB_FORMS.DASHBOARD,
        icon: <MegaphoneIcon size={24} className="items-center" color="white" />,
        children: []
      },
      {
        title: "Inbox",
        url: "",
        icon: <Tray size={24} className="items-center" color="white" />,
        children: []
      },
      {
        title: "Automation",
        url: "/workflows",
        icon: <Atom size={24} className="items-center" color="white" />,
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
                  return (
                    <SidebarMenuItem className="h-10" key={subSection.title}>
                      <SidebarMenuButton 
          
                        className="flex items-center justify-center"
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link 
                              to={subSection.url}
                              className="flex items-center justify-center"
                            >
                              {
                                isCollapsed && (<div>{subSection.icon} </div>)
                              }
                              {!isCollapsed && 
                                <div>
                                  { subSection.icon }
                                  <span>{subSection.title}</span>
                                </div>
                              }
                              
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            {subSection.title}
                          </TooltipContent>
                        </Tooltip>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}         
                  
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