import express from "express"
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

import _ from "lodash"

let posts = []
let content = ""
let title = ""


app.get("/", function(req, res){        //to setup home page
    res.render("index.ejs")
})

app.get("/create", function(req, res){       //to setup create page
    res.render("create.ejs")
})

app.post("/submit", function(req, res){       //what will happen when post takes place in /submit
    const post = {
        title: req.body.title,
        content: req.body.content
    }
    posts.push(post)
    
    res.redirect("/view")
})

app.get("/view", function(req, res){                 //what will happen when view is called
    res.render("view.ejs", {posts: posts})
})

app.get("/view/:postName", function(req, res){           //what will happen when u click on read more
    const reqTitle = _.lowerCase(req.params.postName)

    posts.forEach(function(post){
        const storedTitle = _.lowerCase(post.title)

        if(storedTitle===reqTitle){
            res.render("particularPost.ejs", {title: post.title, content: post.content} )
        }
    })
})

app.post("/delete/:postName", function(req, res){           //to delete particular blog
    const reqTitle = _.lowerCase(req.params.postName)

    posts = posts.filter(posts=> _.lowerCase(posts.title)!==reqTitle)
    res.redirect("/delete")
})

app.get("/delete", function(req, res){                   //to call delete page
    res.render("delete.ejs", {posts:posts})
})


app.post("/update/:postName", function(req, res){                 //to update particular blog
    const reqTitle = _.lowerCase(req.params.postName)

    posts.forEach(function(post){
        const storedTitle = _.lowerCase(post.title)

        if(storedTitle===reqTitle){
            res.render("updateParticular.ejs", {title: post.title, content: post.content} )
        }
    })
    posts = posts.filter(posts=>(_.lowerCase(posts.title)!==reqTitle))
})

app.get("/update", function(req, res){        //to call update page
    res.render("update.ejs", {posts:posts})
})

app.post("/updatedPost", function(req, res){          //to post updated blog
    const post = {
        title: req.body.title,
        content: req.body.content
    }
    posts.push(post)

    res.redirect("/update")
})


app.get("/about.ejs", (req, res)=>{        //calling about page
    res.render("about.ejs")
})

app.get("/contact.ejs", (req, res)=>{            //calling contact us
    res.render("contact.ejs")
})

app.listen(port, function(){            //setting up server
    console.log(`Server is running on port ${port}`);
})