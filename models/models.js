 var mongoose = require('mongoose');


 var userSchema = new mongoose.Schema({
    username: String,
    password: String, //hash created from password
    created_at: {type: Date, default: Date.now}
});

 var postSchema = new mongoose.Schema({
   /* created_by: { type: Schema.ObjectId, ref: 'User' }, */
    created_at: {type: Date, default: Date.now},
    text: String
});



// Creates a User Schema. This will be the basis of how user data is stored in the db
var UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    tagtype: {type: String, required: true},
    city: {type: String, required: true},
    description: {type: String, required: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// Sets the created_at parameter equal to the current time
UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
UserSchema.index({location: '2dsphere'});

// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "Tag"
module.exports = mongoose.model('Tag', UserSchema);

mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);