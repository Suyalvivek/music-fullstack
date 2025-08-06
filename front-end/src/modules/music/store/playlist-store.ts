import { create } from "zustand";
import { getMyPlaylists, getPlaylistDetails, addSongToPlaylist, removeSongFromPlaylist, createPlaylist, deletePlaylist } from "../api/playlist-api";

type Song = {
  _id: string;
  title: string;
  desc: string;
  image: string;
  audiourl: string;
};

type Playlist = {
  _id: string;
  name: string;
  userId: string;
  songs: Song[] | string[];
  createdAt: string;
};

type PlaylistStore = {
  playlists: Playlist[];
  currentPlaylist: Playlist | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchPlaylists: () => Promise<void>;
  fetchPlaylistDetails: (playlistId: string) => Promise<void>;
  addSongToPlaylist: (playlistId: string, songId: string) => Promise<boolean>;
  removeSongFromPlaylist: (playlistId: string, songId: string) => Promise<boolean>;
  createNewPlaylist: (name: string) => Promise<boolean>;
  deleteUserPlaylist: (playlistId: string) => Promise<boolean>;
  clearError: () => void;
};

export const usePlaylistStore = create<PlaylistStore>((set, get) => ({
  playlists: [],
  currentPlaylist: null,
  loading: false,
  error: null,
  
  // Fetch all playlists for the user
  fetchPlaylists: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getMyPlaylists();
      if (response.data.success) {
        set({ playlists: response.data.playlists, loading: false });
      } else {
        set({ error: response.data.message || "Failed to fetch playlists", loading: false });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "An error occurred while fetching playlists", 
        loading: false 
      });
    }
  },
  
  // Fetch details of a specific playlist
  fetchPlaylistDetails: async (playlistId) => {
    try {
      set({ loading: true, error: null });
      const response = await getPlaylistDetails(playlistId);
      if (response.data.success) {
        set({ currentPlaylist: response.data.playlist, loading: false });
      } else {
        set({ error: response.data.message || "Failed to fetch playlist details", loading: false });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "An error occurred while fetching playlist details", 
        loading: false 
      });
    }
  },
  
  // Add a song to a playlist
  addSongToPlaylist: async (playlistId, songId) => {
    try {
      set({ loading: true, error: null });
      const response = await addSongToPlaylist(playlistId, songId);
      
      if (response.data.success) {
        // If we have the current playlist loaded and it's the one we're modifying
        const { currentPlaylist, playlists } = get();
        if (currentPlaylist && currentPlaylist._id === playlistId) {
          // Update the current playlist
          set({ 
            currentPlaylist: response.data.playlist,
            loading: false 
          });
        }
        
        // Update the playlist in the playlists array
        const updatedPlaylists = playlists.map(playlist => 
          playlist._id === playlistId ? response.data.playlist : playlist
        );
        
        set({ playlists: updatedPlaylists, loading: false });
        return true;
      } else {
        set({ error: response.data.message || "Failed to add song to playlist", loading: false });
        return false;
      }
    } catch (error: any) {
        set({ 
          error: error.response?.data?.message || "An error occurred while adding song to playlist", 
          loading: false 
        });
      return false;
    }
  },
  
  // Remove a song from a playlist
  removeSongFromPlaylist: async (playlistId, songId) => {
    try {
      set({ loading: true, error: null });
      const response = await removeSongFromPlaylist(playlistId, songId);
      
      if (response.data.success) {
        // If we have the current playlist loaded and it's the one we're modifying
        const { currentPlaylist, playlists } = get();
        if (currentPlaylist && currentPlaylist._id === playlistId) {
          // Update the current playlist
          set({ 
            currentPlaylist: response.data.playlist,
            loading: false 
          });
        }
        
        // Update the playlist in the playlists array
        const updatedPlaylists = playlists.map(playlist => 
          playlist._id === playlistId ? response.data.playlist : playlist
        );
        
        set({ playlists: updatedPlaylists, loading: false });
        return true;
      } else {
        set({ error: response.data.message || "Failed to remove song from playlist", loading: false });
        return false;
      }
    } catch (error: any) {
        set({ 
          error: error.response?.data?.message || "An error occurred while removing song from playlist", 
          loading: false 
        });
      return false;
    }
  },
  
  // Create a new playlist
  createNewPlaylist: async (name) => {
    try {
      set({ loading: true, error: null });
      const response = await createPlaylist(name);
      
      if (response.data.success) {
        // Add the new playlist to the playlists array
        const { playlists } = get();
        set({ 
          playlists: [...playlists, response.data.playlist],
          loading: false 
        });
        return true;
      } else {
        set({ error: response.data.message || "Failed to create playlist", loading: false });
        return false;
      }
    } catch (error: any) {
        set({ 
          error: error.response?.data?.message || "An error occurred while creating playlist", 
          loading: false 
        });
      return false;
    }
  },
  
  // Delete a playlist
  deleteUserPlaylist: async (playlistId) => {
    try {
      set({ loading: true, error: null });
      const response = await deletePlaylist(playlistId);
      
      if (response.data.success) {
        // Remove the playlist from the playlists array
        const { playlists, currentPlaylist } = get();
        const updatedPlaylists = playlists.filter(playlist => playlist._id !== playlistId);
        
        // If the current playlist is the one being deleted, set it to null
        if (currentPlaylist && currentPlaylist._id === playlistId) {
          set({ currentPlaylist: null });
        }
        
        set({ playlists: updatedPlaylists, loading: false });
        return true;
      } else {
        set({ error: response.data.message || "Failed to delete playlist", loading: false });
        return false;
      }
    } catch (error: any) {
        set({ 
          error: error.response?.data?.message || "An error occurred while deleting playlist", 
          loading: false 
        });
      return false;
    }
  },
  
  // Clear any error
  clearError: () => set({ error: null })
}));