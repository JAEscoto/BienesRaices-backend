import {model, Schema} from "mongoose";

const messagesSchema = new Schema({
    mensaje: {type: String, required: true},
    userId: {type: String, ref: 'users', required: true},
    propertyId: {type: String, ref: 'properties', required: true},
    createdAt: {type: Date, default: Date.now()},
    modifiedAt: {type: Date, default: Date.now()}
});

const Messages = model('Messages', messagesSchema);

export default Messages;
