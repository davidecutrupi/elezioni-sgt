import { google } from 'googleapis'

export const SheetConnection = () => {
  const jwt = new google.auth.JWT(
    'spreadsheet@elezioni-326809.iam.gserviceaccount.com',
    null,
    (process.env.GOOGLE_SHEET_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    'https://www.googleapis.com/auth/spreadsheets'
  )
  return google.sheets({ version: 'v4', auth: jwt })
}

export const ReadSheetData = async (sheet, criteria) => {
	return (await sheet.spreadsheets.values.get({ spreadsheetId: process.env.SPREADSHEET_ID, range: criteria })).data.values
}

export const WriteSheetData = async (sheet, criteria, values) => {
	return (await sheet.spreadsheets.values.update({
		spreadsheetId: process.env.SPREADSHEET_ID,
		range: criteria,
		valueInputOption: 'USER_ENTERED',
		resource: { values: values }
	}))
}