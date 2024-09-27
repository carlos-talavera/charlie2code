
export async function POST(req: Request) {
  const API_KEY = process.env.EMAILOCTOPUS_API_KEY
  const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID
  const API_URL = 'https://emailoctopus.com/api/1.6/'

  const body = await req.json();

  const data = { api_key: API_KEY, ...body }

  const API_ROUTE = `${API_URL}lists/${LIST_ID}/contacts`

  const language = data['fields']['Language']

  try {
    const response = await fetch(API_ROUTE, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const errorMessage = language === "English"
        ? "There was an error subscribing to the list."
        : "Hubo un error al suscribirse a la lista."

    if (response.status >= 400) {
     return Response.json({ message: errorMessage }, { status: response.status })
    }

    const message = language === "English"
      ? "Subscribed!  🎉"
      : "¡Suscrito!  🎉"

    return Response.json({ message }, { status: 200 })
  } catch (error) {
    console.error(error)

    return Response.json({ message: error.message }, { status: 500 })
  }
  
}