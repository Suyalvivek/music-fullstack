export const login = (req, res) => {
    res.json({message:"User Login"});
};

export const register = (req, res) => {
    console.log('User data',req.body);
    const userObject = req.body;

    res.json({message:"User Register"});
};

export const profile = (req, res) => {
    res.json({message:"User Profile"});
};