import {Request} from 'express'
import {JwtFromRequestFunction} from 'passport-jwt'

export const jwtExtractorFromCookies: JwtFromRequestFunction = (
    request: Request,
): string | null => {
    try {
        return request.cookies['jwt']
    } catch (error) {
        return null
    }
}