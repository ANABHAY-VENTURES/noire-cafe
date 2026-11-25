import { Request, Response } from 'express';
import { Setting } from '../models/Setting.js';

export const getSettings = async (_req: Request, res: Response): Promise<void> => {
  try {
    const settingsList = await Setting.find();
    const settingsMap: Record<string, any> = {};
    for (const s of settingsList) {
      settingsMap[s.key] = s.value;
    }

    res.json({ success: true, settings: settingsMap });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const updates = req.body; // Key-value dictionary
    for (const [key, value] of Object.entries(updates)) {
      await Setting.findOneAndUpdate(
        { key },
        { key, value },
        { upsert: true, new: true }
      );
    }

    res.json({ success: true, message: 'Settings updated successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
