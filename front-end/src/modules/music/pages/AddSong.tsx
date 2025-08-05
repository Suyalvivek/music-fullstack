import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { addNewSong as addNewSongApi } from "../api/music-api";

const AddSong = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          title: "",
          desc: "",
          audio: "",
          image:""
        },
      });
    const addNewSong=(songObject:any)=>{
        console.log(songObject);
        const songFormData=new FormData();//for file
        songFormData.append('title',songObject.title);
        songFormData.append('desc',songObject.desc);
        songFormData.append('image',songObject.image);
        //formData.audio is fileList
        if(songObject.audio && songObject.audio[0]){
            songFormData.append('audio',songObject.audio[0]);
        }
        addNewSongApi(songObject);
    }
    const checkSize=(event:any)=>{
        const currentFile=event.target.files[0];
        if(currentFile.size>5*1024*1024){
            alert("File size should be less than 5MB");
            return;
        }
        
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4 text-white">
      <Card className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-white tracking-wide mb-2">Add New Song</CardTitle>
          <CardDescription className="text-center">
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <form onSubmit={handleSubmit(addNewSong)} className="space-y-4">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-gray-300 mb-1 text-sm font-medium block">Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Song title"
                  {...register("title")}
                  className="bg-gray-800 text-white border border-gray-700 placeholder-gray-400 rounded-md px-4 py-2 w-full"
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="desc" className="text-gray-300 mb-1 text-sm font-medium block">Description</Label>
                <Input
                  type="text"
                  id="desc"
                  placeholder="Song description"
                  {...register("desc")}
                  className="bg-gray-800 text-white border border-gray-700 placeholder-gray-400 rounded-md px-4 py-2 w-full"
                />
              </div>

              {/* Image */}
              <div>
                <Label htmlFor="image" className="text-gray-300 mb-1 text-sm font-medium block">Image URL</Label>
                <Input
                  type="text"
                  id="image"
                  {...register("image")}
                  className="bg-gray-800 text-white border border-gray-700 placeholder-gray-400 rounded-md px-4 py-2 w-full"
                />
              </div>
              <div>
                <Label htmlFor="audio" className="text-gray-300 mb-1 text-sm font-medium block">Upload mp3 song</Label>
                <Input
                  type="file"
                  id="audio"
                  accept=".mp3,audio/*"
                  {...register("audio")}
                  onChange={checkSize}
                  className="bg-gray-800 text-white border border-gray-700 placeholder-gray-400 rounded-md px-4 py-2 w-full"
                />
              </div>

              {/* Upload Button */}
              <div className="pt-4">
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold tracking-wide">
                  Upload New Song
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddSong