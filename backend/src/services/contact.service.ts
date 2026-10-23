import { ContactMessage, IContactMessage, ContactStatus } from '../models/ContactMessage';
import { CreateContactInput } from '../validators/contact.validator';
import { AppError } from '../utils/AppError';

export class ContactService {
  static async submitMessage(input: CreateContactInput): Promise<IContactMessage> {
    const contact = new ContactMessage({
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      subject: input.subject.trim(),
      message: input.message.trim(),
      status: 'unread',
    });

    await contact.save();
    return contact;
  }

  static async listMessages(status?: string): Promise<IContactMessage[]> {
    const filter: any = {};
    if (status) {
      filter.status = status;
    }
    return ContactMessage.find(filter).sort({ createdAt: -1 });
  }

  static async updateStatus(id: string, status: ContactStatus): Promise<IContactMessage> {
    const message = await ContactMessage.findById(id);
    if (!message) {
      throw new AppError('Contact message not found.', 404);
    }

    message.status = status;
    await message.save();
    return message;
  }
}
