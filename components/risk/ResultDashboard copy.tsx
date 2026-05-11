"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Play, 
  Edit, 
  Trash2,
  Copy,
  Eye,
  Download,
  RefreshCw,
  AlertCircle,
  BarChart3
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Import hooks
import { 
  useGetNetScenarios
} from "@/features/net_scenario/api/use-get-net_scenarios";
import { useBulkDeleteNetScenarios } from "@/features/net_scenario/api/use-bulk-delete-net_scenarios";


import { 
  ScenarioMetricsCard, 
  ScenarioTimelineChart, 
  ScenarioQuickStats 
} from "@/components/risk/resultsDashboard/simDashboard/scenario-metrics-card";

export default function ScenariosPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [, setCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("table");
  
  // Use the database hooks
  const { 
    data: scenarios, 
    isLoading, 
    error, 
    refetch,
    isRefetching 
  } = useGetNetScenarios();

  const deleteScenario = useBulkDeleteNetScenarios();

  // Filter scenarios based on search query
  const filteredScenarios = scenarios?.filter(scenario =>
    scenario.netId.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "running":
        return "secondary";
      case "failed":
        return "destructive";
      case "draft":
        return "outline";
      default:
        return "default";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "simulation":
        return "🔬";
      case "variation":
        return "📊";
      case "comparison":
        return "⚖️";
      case "risk":
        return "⚠️";
      case "safety-stock":
        return "📦";
      default:
        return "📋";
    }
  };


  const handleRunScenario = async (id: string) => {
    // TODO: Implement scenario running logic
    router.push(`/scenarios/${id}/run`);
  };

  const handleEditScenario = (id: string) => {
    router.push(`/scenarios/${id}/edit`);
  };

  const handleViewResults = (id: string) => {
    router.push(`/scenarios/${id}/results`);
  };

  const handleDuplicateScenario = async (id: string) => {
    // TODO: Implement scenario duplication logic
    console.log("Duplicate scenario:", id);
  };

  const handleDeleteScenario = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      try {
        await deleteScenario.mutateAsync({ ids: [Number(id)] });
      } catch (error) {
        // Error is handled by the mutation hook
      }
    }
  };

  const handleExportScenario = (id: string) => {
    window.open(`/api/scenarios/${id}/export`, '_blank');
  };

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load scenarios. Please try again.
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Scenarios</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your supply chain optimization scenarios
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Scenario
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="table">
            <Search className="w-4 h-4 mr-2" />
            Scenarios
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-4">
          {/* Search */}
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search scenarios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </Card>

          {/* Scenarios Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Loading skeletons
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-8 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredScenarios.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      {searchQuery ? "No scenarios found matching your search" : "No scenarios created yet"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredScenarios.map((scenario) => (
                    <TableRow key={scenario.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{scenario.netId}</div>
                         
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{getTypeIcon(scenario.scenarioType)}</span>
                          <span className="capitalize">{scenario.scenarioType.replace("-", " ")}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(scenario.status)}>
                          {scenario.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatDistanceToNow(new Date(scenario.created || ""), { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        {formatDistanceToNow(new Date(scenario.updatedAt || ""), { addSuffix: true })}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              disabled={deleteScenario.isPending}
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {scenario.status === "draft" && (
                              <DropdownMenuItem onClick={() => handleRunScenario(scenario.id.toString())}>
                                <Play className="w-4 h-4 mr-2" />
                                Run Scenario
                              </DropdownMenuItem>
                            )}
                            {scenario.status === "completed" && (
                              <DropdownMenuItem onClick={() => handleViewResults(scenario.id.toString())}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Results
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleEditScenario(scenario.id.toString())}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicateScenario(scenario.id.toString())}>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExportScenario(scenario.id.toString())}>
                              <Download className="w-4 h-4 mr-2" />
                              Export
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteScenario(String(scenario.id), scenario.netId)}
                              disabled={deleteScenario.isPending}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {/* Quick Stats */}
          <ScenarioQuickStats />
          
          {/* Charts */}
          <ScenarioMetricsCard />
          
          {/* Timeline */}
          <ScenarioTimelineChart />
        </TabsContent>
      </Tabs>

    
    </div>
  );
}
