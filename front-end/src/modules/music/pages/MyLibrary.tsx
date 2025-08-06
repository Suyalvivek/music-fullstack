import { useEffect, useState } from 'react';
import { usePlaylistStore } from '../store/playlist-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, Play, Plus } from 'lucide-react';

type Song = {
  _id: string;
  title: string;
  desc: string;
  image: string;
  audiourl: string;
};

// Playlist type is used in the component

const MyLibrary = () => {
  const { playlists, currentPlaylist, fetchPlaylists, fetchPlaylistDetails, deleteUserPlaylist, removeSongFromPlaylist, createNewPlaylist, loading, error } = usePlaylistStore();
  const [activePlaylist, setActivePlaylist] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const handlePlaylistClick = async (playlistId: string) => {
    await fetchPlaylistDetails(playlistId);
    setActivePlaylist(playlistId);
  };

  const handleRemoveSong = async (playlistId: string, songId: string) => {
    const success = await removeSongFromPlaylist(playlistId, songId);
    if (success) {
      toast({
        title: 'Success',
        description: 'Song removed from playlist',
        variant: 'default',
      });
    } else {
      toast({
        title: 'Error',
        description: error || 'Failed to remove song from playlist',
        variant: 'destructive',
      });
    }
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      const success = await deleteUserPlaylist(playlistId);
      if (success) {
        toast({
          title: 'Success',
          description: 'Playlist deleted successfully',
          variant: 'default',
        });
        setActivePlaylist(null);
      } else {
        toast({
          title: 'Error',
          description: error || 'Failed to delete playlist',
          variant: 'destructive',
        });
      }
    }
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) {
      toast({
        title: 'Error',
        description: 'Playlist name cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    const success = await createNewPlaylist(newPlaylistName);
    if (success) {
      toast({
        title: 'Success',
        description: 'Playlist created successfully',
        variant: 'default',
      });
      setNewPlaylistName('');
      setIsCreateDialogOpen(false);
    } else {
      toast({
        title: 'Error',
        description: error || 'Failed to create playlist',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Library</h1>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="mr-2 h-4 w-4" /> Create Playlist
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Playlist</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="playlist-name" className="text-sm font-medium">
                    Playlist Name
                  </label>
                  <input
                    id="playlist-name"
                    type="text"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="Enter playlist name"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <Button 
                  onClick={handleCreatePlaylist} 
                  disabled={loading}
                  className="w-full"
                >
                  Create Playlist
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading && !currentPlaylist ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : playlists.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No playlists yet</h2>
            <p className="text-gray-500 mb-6">Create your first playlist to start organizing your favorite songs.</p>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="mr-2 h-4 w-4" /> Create Playlist
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>My Playlists</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {playlists.map((playlist) => (
                      <div 
                        key={playlist._id} 
                        className={`flex justify-between items-center p-3 rounded-md cursor-pointer ${activePlaylist === playlist._id ? 'bg-indigo-100' : 'hover:bg-gray-100'}`}
                        onClick={() => handlePlaylistClick(playlist._id)}
                      >
                        <span className="font-medium">{playlist.name}</span>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePlaylist(playlist._id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              {currentPlaylist ? (
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>{currentPlaylist.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentPlaylist.songs.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No songs in this playlist yet.</p>
                        <p className="text-gray-500 mt-2">Add songs from the home page.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {currentPlaylist.songs.map((song) => {
                          // Handle both Song objects and string IDs
                          const songObj = typeof song === 'string' ? null : song;
                          const songId = typeof song === 'string' ? song : song._id;
                          
                          // Skip rendering if we don't have the song object
                          if (!songObj) return null;
                          
                          return (
                            <div key={songId} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={songObj.image} 
                                  alt={songObj.title} 
                                  className="w-12 h-12 object-cover rounded-md"
                                />
                                <div>
                                  <h3 className="font-medium">{songObj.title}</h3>
                                  <p className="text-sm text-gray-500 line-clamp-1">{songObj.desc}</p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Play className="h-4 w-4 text-indigo-600" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleRemoveSong(currentPlaylist._id, songId)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          );
                        })
                      }
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Select a playlist to view its songs</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibrary;