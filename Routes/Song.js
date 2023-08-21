const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../Models/Songs");
const User = require("../Models/User");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.post(
    "/create",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        console.log("User:", req.user);
        // req.user getss the user because of passport.authenticate
        const {name, thumbnail, track} = req.body;
        if (!name || !thumbnail || !track) {
            return res
                .status(301)
                .json({err: "Insufficient details to create song."});
        }
        const artist = req.user._id;
        const songDetails = {name, thumbnail, track, artist};
        const createdSong = await Song.create(songDetails);
        return res.status(200).json(createdSong);
    }
);
// Get route to get all songs I have published.
router.get(
    "/get/mysongs",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        // We need to get all songs where artist id == currentUser._id
        const songs = await Song.find({artist: req.user._id}).populate(
            "artist"
        );

   



        return res.status(200).json({data: songs});
    }
);


router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const songId = req.params.id;
            console.log('Song ID to delete:', songId);

            // Find the song by ID
            const song = await Song.findById(songId);
            console.log('Found song:', song);

            // Check if the logged-in user is the artist of the song
            if (song.artist.toString() !== req.user._id.toString()) {
                return res.status(403).json({ err: 'You are not authorized to delete this song.' });
            }

            // Delete the song from the database
            await song.remove();
            console.log('Song deleted successfully');

            return res.status(200).json({ message: 'Song deleted successfully.' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ err: 'Internal server error.' });
        }
    }
);




// Get route to get all songs any artist has published
// I will send the artist id and I want to see all songs that artist has published.
router.get(
    "/get/artist/:artistId",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const {artistId} = req.params;
        // We can check if the artist does not exist
        const artist = await User.findOne({_id: artistId});
        // ![] = false
        // !null = true
        // !undefined = true
        if (!artist) {
            return res.status(301).json({err: "Artist does not exist"});
        }

        const songs = await Song.find({artist: artistId});
        return res.status(200).json({data: songs});
    }
);

// Get route to get a single song by name

// Get route to get a single song by name
router.get(
    "/get/songname/:songName",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const {songName} = req.params;

        // name:songName --> exact name matching. Vanilla, Vanila
        // Pattern matching instead of direct name matching.
        const songs = await Song.find({ name: { $regex: songName, $options: "i" } }).populate("artist");

        return res.status(200).json({data: songs});
    }
);
const shuffleArray = (array) => {
    const shuffledArray = [...array]; // Create a copy of the original array

    // Fisher-Yates shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }

    return shuffledArray;
};

// Example usage
const originalArray = [1, 2, 3, 4, 5];
const shuffledArray = shuffleArray(originalArray);
console.log(shuffledArray); // Output will be a shuffled version of the original array




const generateSuggestion = async () => {
    try {
        // Retrieve all songs from the database
        const allSongs = await Song.find({}).populate("artist");

        // Shuffle the songs array to get random suggestions
        const shuffledSongs = shuffleArray(allSongs);

        // Return a subset of shuffledSongs as suggestions
        const numberOfSuggestions = 3; // You can adjust the number of suggestions as needed
        return shuffledSongs.slice(0, numberOfSuggestions);
    } catch (error) {
        console.error("Error generating song suggestions:", error);
        return [];
    }
};


// Add this route handler at the end of your routes
router.get(
    "/get/random-suggestions",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const suggestions = await generateSuggestion();

            return res.status(200).json({ data: suggestions });
        } catch (error) {
            console.error("Error fetching random suggestions:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
);



// ... Other route handlers ...


 
// ... Other code ...

module.exports = router;











const generateSuggestions = async (currentPlayingSongId) => {
    try {
        // Retrieve all songs except the currently playing song
        const allSongs = await Song.find({ _id: { $ne: currentPlayingSongId } });
        
        // Shuffle the songs array to get random suggestions
        const shuffledSongs = shuffleArray(allSongs);

        // Return a subset of shuffledSongs as suggestions
        const numberOfSuggestions = 3; // You can adjust the number of suggestions as needed
        return shuffledSongs.slice(0, numberOfSuggestions);
    } catch (error) {
        console.error("Error generating song suggestions:", error);
        return [];
    }
};

// ... Other code ...









module.exports = router;