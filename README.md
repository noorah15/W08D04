## social media backend

In this task, it has been created backend with Express server.

In command write:
npm init -y

It has been import these packages:
express:
The Express philosophy is to provide small, robust tooling for HTTP servers, making it a great solution for single page applications, web sites, hybrids, or public HTTP APIs.

        In command write:
        npm i express

        For more information visit:
        https://www.npmjs.com/package/express

    dotenv:
        Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

        In command write:
        npm i dotenv

        For more information visit:
        https://www.npmjs.com/package/dotenv

    jsonwebtoken:
        JSON Web Tokens (JWT) are an RFC 7519 open industry standard for representing claims between two parties. For example, you can use jwt.io to decode, verify, and produce JWT.
        JWT specifies a compact and self-contained method for communicating information as a JSON object between two parties. Because it is signed, this information can be checked and trusted. JWTs can be signed using a secret (using the HMAC algorithm) or an RSA or ECDSA public/private key combination. In a moment, we’ll see some examples of how to use them.

        In command write:
        npm i jsonwebtoken

        For more information visit:
        https://www.npmjs.com/package/jsonwebtoken


    bcrypt:

        The bcrypt NPM package is a JavaScript implementation of the bcrypt password hashing function that allows you to easily create a hash out of a password string. Unlike encryption which you can decode to get back the original password, hashing is a one-way function that can’t be reversed once done.

        When the user submits a password, the password will be hashed and your JavaScript application needs to store the hash in the database. Later when the user wants to authenticate his or her account, you need to compare the password input with the hash stored in your database to see if it matches.

        In command write:
        npm i bcrypt


        For more information visit:
        https://www.npmjs.com/package/bcrypt


    mongoose:

        Mongoose is a Node.js-based Object Data Modeling (ODM) library for MongoDB. It is akin to an Object Relational Mapper (ORM) such as SQLAlchemy for traditional SQL databases. The problem that Mongoose aims to solve is allowing developers to enforce a specific schema at the application layer. In addition to enforcing a schema, Mongoose also offers a variety of hooks, model validation, and other features aimed at making it easier to work with MongoDB.

        In command write:
        npm i mongoose


        For more information visit:
        https://www.npmjs.com/package/mongoose

models:

    1-user

        email: { type: String, required: true, trim: true },
        username: { type: String, required: true, trim: true },
        password: { type: String, required: true },
        avter: { type: String, required: true },
        isDel: { type: Boolean, default: false },
        role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },

    2-role

        role: { type: String, required: true, trim: true },
        permissions: { type: Array, required: true },

    3-post

        user: { type: mongoose.Schema.Types.ObjectId, ref: "users2" },
        img: { type: String, required: true, trim: true },
        desc: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        likes: { type: Array },
        isDel: { type: Boolean, default: false },

    4-like

        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users2" },
        postId: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
        isDel: { type: Boolean, default: false },

    5-comment

        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users2" },
        postId: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
        desc: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        isDel: { type: Boolean, default: false },

routers:
controllers:
1-user:

            register:
                Create signup function. It has been use bcrypt.hash() from bcrypt package to hashing password. The main benefit is security.

            login:
                Create signup function. It has been use  bcrypt.compare() from bcrypt package to hashing password. The main benefit is convert passoword that etered to hash password to compare it with password in DB.
                The jwt.sign() method takes a payload and the secret key defined in .env as parameters.It creates a unique string of characters representing the payload. In our case, the payload is an object containing the id of the user and its role.

            getUsers:
                Create function to return all users.

            delUser:
                Create function to delete specific user. The deletion is soft delete.

        2-role:

            addRole:
                It is function that add role such as admin and user.
            getRoles:
                It is function that get all roles in DB.

        3-post

            addPost: It is function that add post.
            updatePost: It is function that update post.
            delPost: It is function that delete post.
            getAllPosts: It is function that get posts.
            getAllPostsForUser: It is function that get all post forn spcific user.
            getPostForUser: It is function that get spcific post with comment and likes.

        4-like

            addLike:It is function that add like to spcific post.
            removeLike:It is function that remove like from spcific post.

        5-comment
            addCommnet:  It is function that add comment to post.
            updateComment: It is function that update comment.
            delComment: It is function that delete comment.
            getComment: It is function that get comment.
    routes:
        1-user:

            userRouter.post("/signup", register); //localhost:4000/user/signup
            userRouter.post("/login", login); //localhost:4000/user/login

            //for admin
            userRouter.get("/users", authentication, adminAuthorization, getUsers); //localhost:4000/user/users
            userRouter.delete("/delUsers", authentication, adminAuthorization, delUser); //localhost:4000/user/delUsers

        2-role

            roleRouter.post("/addRole", addRole); //localhost:4000/addRole
            roleRouter.get("/getRoles", getRoles); //localhost:4000/getRoles

        3-post

            postRoter.get("/getAllPosts", getAllPosts); //localhost:4000/post/getAllPosts
            postRoter.get("/getAllPostsForUser/:id", getAllPostsForUser); //localhost:4000/post/getAllPostsForUser/:id
            postRoter.get("/getPostForUser/:id", getPostForUser); //localhost:4000/post/getPostForUser/:id

            //user
            postRoter.post("/addPost", authentication, userAuthorization, addPost); //localhost:4000/post/addPost
            postRoter.put("/addPost", authentication, userAuthorization, updatePost); //localhost:4000/post/addPost
            postRoter.delete("/delPost", authentication, userAuthorization, delPost); //localhost:4000/post/delPost

            //for admin
            postRoter.delete("/delPostByAdmin",authentication, adminAuthorization, delPost); //localhost:4000/post/delPostByAdmin

        4-like
            likeRouter.post("/addLike", authentication, userAuthorization, addLike); //localhost:4000/like/addLike
            likeRouter.delete("/removeLike", authentication, userAuthorization, removeLike); //localhost:4000/like/removeLike


        5-comment

            commentRoter.get("/getComment/:id", getComment); //localhost:4000/comments/getComment/:id

            //user
            commentRoter.post("/addCommnet", authentication, userAuthorization, addCommnet); //localhost:4000/comments/addCommnet
            commentRoter.put("/updateComment", authentication, userAuthorization, updateComment); //localhost:4000/comments/updateComment
            commentRoter.delete("/delComment", authentication, userAuthorization, delComment); //localhost:4000/comments/delComment

            //for admin
            commentRoter.delete( "/delCommentByAdmin",authentication, adminAuthorization, delComment); //localhost:4000/comments/delCommentByAdmin

    middlewares:
        1-authentication:
            uthentication is the process of determining whether someone or something is, in fact, who or what it says it is. Authentication technology provides access control for systems by checking to see if a user's credentials match the credentials in a database of authorized users or in a data authentication server. In doing this, authentication assures secure systems, secure processes and enterprise information security.

        2-authorization:
            Authorization is a security mechanism to determine access levels or user/client privileges related to system resources including files, services, computer programs, data and application features. This is the process of granting or denying access to a network resource which allows the user access to various resources based on the user's identity.

            1-adminAuthorization
                Confirm the user has access permission and its role is admin.
            2-userAuthorization
                Confirm the user has access permission by user ID.
