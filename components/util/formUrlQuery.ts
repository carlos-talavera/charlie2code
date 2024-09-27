interface FormUrlQueryParams {
  pathname: string
  data: Record<string, string | number | boolean>
}

export const formUrlQuery = ({
  pathname,
  data
}: FormUrlQueryParams) => {
  const searchParams = Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  if (!searchParams) {
    return pathname
  }

  return `${pathname}?${searchParams}`
}