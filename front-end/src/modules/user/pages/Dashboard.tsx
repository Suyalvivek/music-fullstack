import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Music Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-white border">
              <h3 className="text-lg font-medium">Total Songs</h3>
              <p className="text-2xl font-bold text-indigo-600">450</p>
            </Card>
            <Card className="p-4 bg-white border">
              <h3 className="text-lg font-medium">Playlists</h3>
              <p className="text-2xl font-bold text-green-600">18</p>
            </Card>
            <Card className="p-4 bg-white border">
              <h3 className="text-lg font-medium">Artists</h3>
              <p className="text-2xl font-bold text-pink-500">97</p>
            </Card>
            <Card className="p-4 bg-white border">
              <h3 className="text-lg font-medium">Albums</h3>
              <p className="text-2xl font-bold text-yellow-600">35</p>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;