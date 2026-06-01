import { Message } from "../models/message.js"
import { User } from "../models/user.js";
import { sendNotification } from "../socket.js";

// envoyer un message

export const sendMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or receiver not found." });
    }

    // Create a unique conversation ID (alphabetical order of IDs to keep it consistent)
    const conversationId = [senderId, receiverId].sort().join("_");

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message,
      conversationId
    });

    await newMessage.save();

    // Notify Receiver
    sendNotification(receiverId, {
      type: 'NEW_MESSAGE',
      message: `New message from ${sender.firstName}`,
      data: {
        senderId,
        message,
        conversationId,
        createdAt: newMessage.createdAt
      }
    });

    res.status(201).json({ message: "Message sent successfully.", newMessage });
  } catch (error) {
    res.status(500).json({ message: `Error sending message: ${error.message}` });
  }
};

// recuperer les messages entre le mentor et l'aprenant

export const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.query;

  try {
    const conversationId = [senderId, receiverId].sort().join("_");
    
    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 })
      .populate("sender receiver", "firstName lastName image");

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: `Error getting messages: ${error.message}` });
  }
};

export const getConversations = async (req, res) => {
  const { userId } = req.params;
  try {
    // This is a bit complex: we want unique users the current user has chatted with
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }]
    }).sort({ createdAt: -1 });

    const contactIds = new Set();
    messages.forEach(m => {
      const contactId = m.sender.toString() === userId ? m.receiver.toString() : m.sender.toString();
      contactIds.add(contactId);
    });

    const contacts = await User.find({ _id: { $in: Array.from(contactIds) } })
      .select("firstName lastName userRole image");

    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}




