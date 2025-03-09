import type { FastifyReply } from 'fastify'

export const sendError = (reply: FastifyReply, statusCode: number, message: string) => {
	return reply.code(statusCode).send({
		error: true,
		message,
	})
}
