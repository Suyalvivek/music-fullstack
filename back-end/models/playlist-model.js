import { Schema, mongoose } from "mongoose";

const playlistSchema = new Schema({
    'name': {
        type: String,
        required: true
    },
    'userId': {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    'songs': [{
        type: Schema.Types.ObjectId,
        ref: 'songs'
    }],
    'createdAt': {
        type: Date,
        default: Date.now
    },
    'status': {
        type: String,
        default: 'A'
    }
});

export const PlaylistModel = mongoose.model('playlists', playlistSchema);