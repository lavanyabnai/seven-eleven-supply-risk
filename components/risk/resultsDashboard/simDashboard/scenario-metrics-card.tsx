import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetNetScenarios } from "@/features/net_scenario/api/use-get-net_scenarios";

// Scenario Metrics Card
export function ScenarioMetricsCard() {
  const { data: scenarios, isLoading } = useGetNetScenarios();

  if (isLoading || !scenarios) {
    return (
      <div>
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
      </div>
    );
  }

  const statusCounts = scenarios.reduce((acc, scenario) => {
    acc[scenario.status] = (acc[scenario.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
    color:
      status === "completed"
        ? "#10b981"
        : status === "running"
        ? "#3b82f6"
        : status === "failed"
        ? "#ef4444"
        : "#6b7280",
  }));

  const typeCounts = scenarios.reduce((acc, scenario) => {
    acc[scenario.scenarioType] = (acc[scenario.scenarioType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeData = Object.entries(typeCounts).map(([type, count]) => ({
    type: type
      .replace("-", " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    count,
  }));

  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Status Distribution */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Scenario Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {statusData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600">
                  {entry.name}: {entry.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Type Distribution */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Scenario Types</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={typeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="type"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}


export function ScenarioTimelineChart() {
  const { data: scenarios, isLoading } = useGetNetScenarios();

  if (isLoading || !scenarios) {
    return (
      <div>
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
      </div>
    );
  }

  type TimelineDataPoint = { date: string; count: number; cumulative?: number };

  const timelineData = scenarios.reduce((acc, scenario) => {
    const date = new Date(scenario.created ?? "").toLocaleDateString();
    const existing = acc.find((item) => item.date === date);

    if (existing) {
      existing.count++;
    } else {
      acc.push({ date, count: 1 });
    }

    return acc;
  }, [] as TimelineDataPoint[]);

  timelineData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let cumulative = 0;
  timelineData.forEach((item) => {
    cumulative += item.count;
    item.cumulative = cumulative;
  });

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className="text-base">Scenarios Created Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={70}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="cumulative"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
              name="Total Scenarios"
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", r: 4 }}
              name="Daily Created"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

  );
}

// Scenario Quick Stats
export function ScenarioQuickStats() {
  const { data: scenarios, isLoading } = useGetNetScenarios();

  if (isLoading || !scenarios) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats = {
    total: scenarios.length,
    completed: scenarios.filter((s) => s.status === "completed").length,
    running: scenarios.filter((s) => s.status === "running").length,
    successRate:
      scenarios.length > 0
        ? (
            (scenarios.filter((s) => s.status === "completed").length /
              scenarios.length) *
            100
          ).toFixed(1)
        : "0",
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Total Scenarios</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Running</p>
          <p className="text-2xl font-bold text-blue-600">{stats.running}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Success Rate</p>
          <p className="text-2xl font-bold">{stats.successRate}%</p>
        </CardContent>
      </Card>
    </div>
  
  );
}
