var mongoose=require('mongoose')
var schema=mongoose.Schema;
var skillSchema=new schema({
    skillName:String,
    experience:Number,
    proficiency:String
})
var jobSeekarSchema=new schema({
    jobSeekerName:String,
    emailId:String,
    age:Number,
    certified:Boolean,
    skills:[skillSchema]
})
var js=mongoose.model('jobseeker',jobSeekarSchema);
mongoose.connect("mongodb://127.0.0.1:27017/library");
var jobseeker1=new js({
    jobseekerName:"Raj",
    age:22,
    emailId:"raja@test.com",
    certified:true,
    skills:[{skillName:"java",experience:1,proficiency:"beginner"},
    {skillName:"angular",experience:2,proficiency:"intermediate"}]

})
jobseeker1.save();