import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart, Plus, Music } from "lucide-react";
import { usePlaylistStore } from "../music/store/playlist-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "../user/store/user-store";

type SongType = {
  _id: string;
  title: string;
  desc: string;
  image: string;
  audiourl: string;
};

type PlaylistType = {
  _id: string;
  name: string;
  userId: string;
  songs: (SongType | string)[];
  createdAt: string;
};

const Song = ({ song }: { song: SongType }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { playlists, fetchPlaylists, addSongToPlaylist, createNewPlaylist, loading, error } = usePlaylistStore();
  const { user } = useUserStore();
  const { toast } = useToast();
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showNewPlaylistInput, setShowNewPlaylistInput] = useState(false);

  const handleAddToPlaylist = () => {
    if (!user.isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to add songs to your playlist",
        variant: "destructive"
      });
      return;
    }
    
    // Fetch playlists when dialog opens
    fetchPlaylists();
    setIsDialogOpen(true);
  };

  const handleAddSongToPlaylist = async (playlistId: string) => {
    if (!song._id) {
      toast({
        title: "Error",
        description: "Invalid song data",
        variant: "destructive"
      });
      return;
    }
    
    const success = await addSongToPlaylist(playlistId, song._id);
    
    if (success) {
      toast({
        title: "Success",
        description: "Song added to playlist",
        variant: "default"
      });
      setIsDialogOpen(false);
    } else {
      toast({
        title: "Error",
        description: error || "Failed to add song to playlist",
        variant: "destructive"
      });
    }
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) {
      toast({
        title: "Error",
        description: "Playlist name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    const success = await createNewPlaylist(newPlaylistName);
    
    if (success) {
      toast({
        title: "Success",
        description: "Playlist created successfully",
        variant: "default"
      });
      setNewPlaylistName("");
      setShowNewPlaylistInput(false);
    } else {
      toast({
        title: "Error",
        description: error || "Failed to create playlist",
        variant: "destructive"
      });
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="w-full h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.01] bg-white/80 backdrop-blur-sm border border-gray-200">
      <CardHeader className="pb-2 relative overflow-hidden group">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={song.image}
            alt={song.title}
            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white bg-black/30 hover:bg-black/50 rounded-full"
              onClick={handleAddToPlaylist}
            >
              <Music className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <CardTitle className="text-xl font-bold truncate">{song.title}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
            onClick={toggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
        <CardDescription className="text-sm text-gray-500 line-clamp-2 mt-1">
          {song.desc}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pt-2">
        <audio
          controls
          className="w-full rounded-md"
          preload="none"
        >
          <source src={song.audiourl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddToPlaylist}
              className="w-full transition-colors duration-300 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Add to Playlist
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add to Playlist</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {loading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : playlists.length === 0 && !showNewPlaylistInput ? (
                <div className="text-center">
                  <p className="mb-4">You don't have any playlists yet.</p>
                  <Button onClick={() => setShowNewPlaylistInput(true)}>Create Playlist</Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {playlists.map((playlist: PlaylistType) => (
                    <div key={playlist._id} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md">
                      <span>{playlist.name}</span>
                      <Button 
                        size="sm" 
                        onClick={() => handleAddSongToPlaylist(playlist._id)}
                        disabled={loading}
                      >
                        Add
                      </Button>
                    </div>
                  ))}
                  
                  {!showNewPlaylistInput && (
                    <Button 
                      variant="outline" 
                      className="w-full mt-4" 
                      onClick={() => setShowNewPlaylistInput(true)}
                    >
                      Create New Playlist
                    </Button>
                  )}
                  
                  {showNewPlaylistInput && (
                    <div className="mt-4 space-y-2">
                      <input
                        type="text"
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                        placeholder="Enter playlist name"
                        className="w-full p-2 border rounded-md"
                      />
                      <div className="flex space-x-2">
                        <Button 
                          onClick={handleCreatePlaylist}
                          disabled={loading}
                          className="flex-1"
                        >
                          Create
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setShowNewPlaylistInput(false);
                            setNewPlaylistName("");
                          }}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Song;