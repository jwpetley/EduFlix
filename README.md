# EduFlix

EduFlix is an online service for students and educators that allows for small scale collaboration in a space condusive to learning.

In the current world students are limited by their options to receive educational material as we operate in this "New Normal". Too often students either have to watch pre-recorded snippets on their own or are forced into large live Zoom calls that allow for little to no-interaction and a tendency not to ask questions due to social pressure.

## Our Solution

Here we provide a tool to allow educators or students to upload video content. This can then be viewed as a group in a fashion similar to a "Netflix Party". Students can pause and play as they like wit synchronous playback. They can speak freely among friends and engage with the content. Optionally lectures with the premium setup can add interactive elements to their videos. This will work much better than in a live zoom call as students will feel happier to discuss and respond to questions amongst their peers and without the eyes and ears of the educator upon them.

## Getting Started Locally

We implement a Python backend with Flask and video-chat interface with JavaScript for this app. We will use AWS storage for video upload and retrieval and also to host the website.

To get the flask server running follow the following commands after cloning:

```
pip install -r requirements.txt
export FLASK_APP=EduFlixApp
export FLASK_ENV=development
export AWS_ACCESS_KEY_ID=<insert_key_here>
export AWS_SECRET_ACCESS_KEY=<secret_key_here>
```

At this point you have two options. You can either attempt to use the current state of the database or you can delete the database and start with a fresh clean website where you can add new users and videos.

### Option 1 - Use Current State

To use the current state simply start:

```
flask run
```

If it's me who has been fiddling with the branch most recently you will be able to already see some videos by logging in with username:**jwpetley** and password:**password**. Head over to the myvideos tab and click on "New_Globe_Test" watch here button to see it all in action!



### Option 2 - Fresh Database

If you want a fresh website to populate with your own stuff then there is an extra step. First delete the current database and then initialise a new one. This is achieved by:

```
rm instance/eduflix.sqlite
flask init-db
```

This initialises a fresh database to use. Then you can run it in the normal way

```
flask run
```

Register a new user and upload an mp4 video. After a few seconds it will redirect you to the MyVideos tab for you to watch (hopefully with friends!)
