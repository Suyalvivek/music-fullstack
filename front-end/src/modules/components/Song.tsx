import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const Song = ({song})=>{
    const handleAddToPlaylist = ()=>{
        console.log('Added in PlayList');
    }
    return (<>
         <Card className="w-full">
      <CardHeader className="pb-3">
        <img 
          src={song.image} 
          alt={song.title}
          className="w-full h-48 object-cover rounded-md mb-2"
        />
        <CardTitle className="text-lg truncate">{song.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600 line-clamp-2">{song.desc}</p>
        
        <audio 
          controls 
          className="w-full"
          preload="none"
        >
          <source src={song.audiourl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        
        <Button 
          onClick={handleAddToPlaylist}
          className="w-full"
          variant="outline"
        >
          Add to Playlist
        </Button>
      </CardContent>
    </Card>
    </>)
}