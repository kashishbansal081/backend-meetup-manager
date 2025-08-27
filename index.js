const dbConnect = require("./database/dbconnect");
const express = require("express");
const app = express();
const Event = require("./database/schema/event.models");
const cors = require('cors')

const corOptions = {
  origin : '*',
  optionsSuccessStatus: 200 
}

app.use(cors(corOptions))

dbConnect();

app.use(express.json());

app.listen(4000, () => {
  console.log("server is running on port 4000");
});


const event = {
     eventTitle: 'Loreal Appreciation Meeting',
    hostedBy: 'Pune Wipro Office',
    eventType: 'Offline',
    eventImages: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lZXRpbmd8ZW58MHx8MHx8fDA%3D',
    eventDescription: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    eventStartTime: '2025-08-14 15:00:00',
    eventEndTime: '2025-08-14 18:00:00',
    eventLocation: {
        venue: 'team meeting',
        address: 'teams',
        city: 'Teams'
    },
    eventPrice: 500,
    eventDressCode: 'Formal',
    eventAgeRestriction: 18,
    eventTags: ['tech','AI'],
    speakers: [{
        name: 'Prathmesh Joshi',
        role : 'Sales Team',
        photo : 'https://media.istockphoto.com/id/2158465451/photo/a-young-indian-man-works-in-the-office-sits-at-a-desk-in-front-of-a-laptop-and-points-to-the.webp?a=1&b=1&s=612x612&w=0&k=20&c=u5-WUt9tVS6RlqM1NJuUcuqNopFKWp-Vjq4QLl_5kng='
    },
    {
        name: 'Mohit Rawait',
        role : 'Sales Team',
        photo : 'https://images.unsplash.com/photo-1706381077572-24b367980d20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHByZXNlbnRlcnxlbnwwfHwwfHx8MA%3D%3D'
    },
  ],
}

const readAllEvents = async () => {
  try {
    const readEvents = await Event.find();
    return readEvents;
  } catch (error) {
    console.log("Facing error while fetching events");
  }
};

app.get("/events", async (req, res) => {
  try {
    const events = await readAllEvents();
    if (events.length != 0) {
      res.send(events);
    } else {
      res.status(404).json({ error: "No data found" });
    }
  } catch (error) {
    console.log("Error while fetching event By Id");
  }
});

app.get("/events/:eventId", async (req, res) => {
  try {
    const events = await Event.findById({_id: req.params.eventId});
    if (events) {
      res.send(events);
    } else {
      res.status(404).json({ error: "No data found" });
    }
  } catch (error) {
    console.log("Error while fetching event");
  }
});


const postData = async (data)=>{
const eventPosted = new Event(data)
const savedEvent = await eventPosted.save()
console.log(savedEvent)
}


// app.get("/eventDetails/:eventTitle", async (req, res) => {
//   try {
//     const event = await Event.find({eventTitle : req.params.eventTitle})
//     if (event) {
//       res.send(event);
//     } else {
//       res.status(404).json({ error: "No data found" });
//     }
//   } catch (error) {
//     console.log("Error while fetching event by title");
//   }
// });

// app.get("/eventDetails/eventTag/:eventTag", async (req, res) => {
//   try {
//     const event = await Event.find({eventTags : req.params.eventTag})
//     if (event) {
//       res.send(event);
//     } else {
//       res.status(404).json({ error: "No data found" });
//     }
//   } catch (error) {
//     console.log("Error while fetching event by title");
//   }
// });


// postData(event)



// app.post("/post/events", async (req, res) => {
//   try {
//     const postEvent = await saveEvent(req.body);
//     if (postEvent) {
//       const savedEvent = await postEvent.save();
//       console.log(savedEvent);
//     } else {
//       console.log("Post is not successfull please try again.");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
