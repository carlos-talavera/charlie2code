import NextImage, { ImageProps } from 'next/image'

const Image = ({ ...rest }: ImageProps) => <NextImage {...rest} className="mx-auto" />

export default Image
