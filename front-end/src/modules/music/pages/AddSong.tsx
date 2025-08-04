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

import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";const AddSong = () => {
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
    const addNewSong=(songObject:unknown)=>{
        console.log(songObject);
    }
    const checkSize=(event:any)=>{
        const currentFile=event.target.files[0];
        if(currentFile.size>5*1024*1024){
            alert("File size should be less than 5MB");
            return;
        }
        
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Add New Song</CardTitle>
          <CardDescription className="text-center">
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status && alertJSx}
          <form onSubmit={handleSubmit(addNewSong)} className="space-y-5">
            {/* Title */}
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Song title"
                {...register("title")}
              />
              
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="desc">Description</Label>
              <Input
                type="text"
                id="desc"
                placeholder="Song description"
                {...register("desc")}
              />
            
            </div>

            {/* Image */}
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                type="text"
                id="image"
                {...register("image")}
              />
             
            </div>
            <div>
              <Label htmlFor="audio">Upload mp3 song</Label>
              <Input
                type="file"
                id="audio"
                accept=".mp3,audio/*"
                {...register("audio")}
                onChange={checkSize}

              />
             
            </div>

            {/* Upload Button */}
            <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">
              Upload New Song
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddSong