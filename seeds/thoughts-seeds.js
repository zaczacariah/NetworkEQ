const { Thought, User } = require('../models');

const thoughtsData = [
  {
    thoughtText: "Morning routines are essential for a productive day.",
    username: "salgood",  
    reactions: [
      {
        reactionBody: "Absolutely! Starting early makes my day!",
        username: "lervio"
      },
      {
        reactionBody: "I need my coffee first, though.",
        username: "amikok"
      },
      {
        reactionBody: "Tried it, not for me. Night owl here!",
        username: "lervio"
      }
    ]
  },
  {
    thoughtText: "Is anyone else into rock climbing?",
    username: "amikok",
    reactions: [
      {
        reactionBody: "Yes! Love it!",
        username: "salgood"
      },
      {
        reactionBody: "Terrified of heights, so no thanks.",
        username: "lervio"
      }
    ]
  },
  {
    thoughtText: "The best coding soundtrack is just pure silence.",
    username: "lervio",
    reactions: [
      {
        reactionBody: "Disagree, lofi beats to code/relax to is the move.",
        username: "salgood"
      },
      {
        reactionBody: "Silence is golden.",
        username: "amikok"
      }
    ]
  },
  {
    thoughtText: "How about that local sports team?",
    username: "salgood",
    reactions: [
      {
        reactionBody: "They're doing great this season!",
        username: "lervio"
      },
      {
        reactionBody: "I don't follow sports much, honestly.",
        username: "amikok"
      },
      {
        reactionBody: "Hope they keep the momentum!",
        username: "salgood"
      }
    ]
  },
  {
    thoughtText: "Does anyone have any good book recommendations?",
    username: "amikok",
    reactions: [
      {
        reactionBody: "I just read a great sci-fi novel!",
        username: "salgood"
      },
      {
        reactionBody: "Check out the classic fantasy series, it's a journey!",
        username: "lervio"
      }
    ]
  }
];

const seedThoughts = async () => {
  await Thought.deleteMany({});  // Clear existing thoughts
  
  return Thought.create(thoughtsData);  // Create new thoughts
};

module.exports = seedThoughts;
