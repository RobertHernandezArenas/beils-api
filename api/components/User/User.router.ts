import { checkRole, isAuthenticated } from '@/middlewares/auth';
import { Router } from 'express';
import { userController } from './User.controller';

export const UserRouter: Router = Router()
	/**
	 * @swagger
	 * tags:
	 *   name: User
	 *   description: API para la gestión de usuarios del sistema (Administradores/Personal)
	 */

	/**
	 * @swagger
	 * /user:
	 *   post:
	 *     summary: Crear un nuevo usuario
	 *     tags: [User]
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             required:
	 *               - email
	 *               - password
	 *             properties:
	 *               email:
	 *                 type: string
	 *                 format: email
	 *                 description: Email único del usuario
	 *               password:
	 *                 type: string
	 *                 format: password
	 *                 minLength: 6
	 *                 description: Contraseña del usuario
	 *     responses:
	 *       201:
	 *         description: Usuario creado exitosamente
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: boolean
	 *                   example: false
	 *                 data:
	 *                   type: object
	 *                   properties:
	 *                     user_id:
	 *                       type: string
	 *                       format: uuid
	 *                     email:
	 *                       type: string
	 *                     role:
	 *                       type: string
	 *                     created_at:
	 *                       type: string
	 *                       format: date-time
	 *       400:
	 *         description: Datos de entrada inválidos
	 *       409:
	 *         description: El email ya está registrado
	 */
	.post('/', userController.create)

	/**
	 * @swagger
	 * /user/login:
	 *   post:
	 *     summary: Iniciar sesión de usuario
	 *     tags: [User]
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             required:
	 *               - email
	 *               - password
	 *             properties:
	 *               email:
	 *                 type: string
	 *                 format: email
	 *               password:
	 *                 type: string
	 *                 format: password
	 *     responses:
	 *       200:
	 *         description: Login exitoso
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: boolean
	 *                   example: false
	 *                 data:
	 *                   type: object
	 *                   properties:
	 *                     user:
	 *                       type: object
	 *                       properties:
	 *                         user_id:
	 *                           type: string
	 *                         email:
	 *                           type: string
	 *                         role:
	 *                           type: string
	 *                     token:
	 *                       type: string
	 *                       description: JWT Bearer Token
	 *       401:
	 *         description: Credenciales inválidas
	 */
	.post('/login', userController.login)

	/**
	 * @swagger
	 * /user/refresh-token:
	 *   post:
	 *     summary: Renovar el token de acceso
	 *     tags: [User]
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             required:
	 *               - refresh_token
	 *             properties:
	 *               refresh_token:
	 *                 type: string
	 *                 description: Token de refresco
	 *     responses:
	 *       200:
	 *         description: Token renovado exitosamente
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: boolean
	 *                   example: false
	 *                 data:
	 *                   type: object
	 *                   properties:
	 *                     token:
	 *                       type: string
	 *                       description: Nuevo Token JWT
	 *                     refreshToken:
	 *                       type: string
	 *                       description: Nuevo Refresh Token
	 *       401:
	 *         description: Refresh token inválido o expirado
	 */
	.post('/refresh-token', userController.refreshToken)

	/**
	 * @swagger
	 * /user:
	 *   get:
	 *     summary: Obtener todos los usuarios
	 *     tags: [User]
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Lista de usuarios
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   type: array
	 *                   items:
	 *                     type: object
	 *                     properties:
	 *                       user_id:
	 *                         type: string
	 *                       email:
	 *                         type: string
	 *                       role:
	 *                         type: string
	 *                 meta:
	 *                   type: object
	 *                   properties:
	 *                     total:
	 *                       type: integer
	 */
	.get('/', isAuthenticated, checkRole(['ADMIN']), userController.findAll)

	/**
	 * @swagger
	 * /user/{id}:
	 *   get:
	 *     summary: Obtener usuario por ID
	 *     tags: [User]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: string
	 *         required: true
	 *         description: ID del usuario
	 *     responses:
	 *       200:
	 *         description: Detalles del usuario
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   type: object
	 *                   properties:
	 *                     id:
	 *                       type: string
	 *                     email:
	 *                       type: string
	 *       404:
	 *         description: Usuario no encontrado
	 */
	.get('/:id', isAuthenticated, checkRole(['ADMIN']), userController.findById)

	/**
	 * @swagger
	 * /user/{user_id}/status:
	 *   patch:
	 *     summary: Activar o desactivar usuario
	 *     tags: [User]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: user_id
	 *         schema:
	 *           type: string
	 *         required: true
	 *         description: ID del usuario
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             required:
	 *               - account_status
	 *             properties:
	 *               account_status:
	 *                 type: string
	 *                 enum: [ACTIVATED, DEACTIVATED]
	 *                 description: Nuevo estado del usuario
	 *                 example: ACTIVATED
	 *     responses:
	 *       200:
	 *         description: Estado actualizado correctamente
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   type: object
	 *                   description: Usuario actualizado
	 *                 message:
	 *                   type: string
	 *       404:
	 *         description: Usuario no encontrado
	 *       400:
	 *         description: Datos inválidos
	 */
	.patch(
		'/:user_id/status',
		isAuthenticated,
		checkRole(['ADMIN']),
		userController.updateStatus,
	)

	/**
	 * @swagger
	 * /user/{id}:
	 *   put:
	 *     summary: Actualizar usuario
	 *     tags: [User]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: string
	 *         required: true
	 *         description: ID del usuario a actualizar
	 *     requestBody:
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               email:
	 *                 type: string
	 *               password:
	 *                 type: string
	 *               role:
	 *                 type: string
	 *     responses:
	 *       200:
	 *         description: Usuario actualizado correctamente
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   type: object
	 *                   description: Objeto usuario actualizado
	 *       404:
	 *         description: Usuario no encontrado
	 */
	.put('/:id', isAuthenticated, checkRole(['ADMIN']), userController.update)

	/**
	 * @swagger
	 * /user/{id}:
	 *   delete:
	 *     summary: Eliminar usuario
	 *     tags: [User]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: string
	 *         required: true
	 *         description: ID del usuario a eliminar
	 *     responses:
	 *       204:
	 *         description: Usuario eliminado correctamente
	 *       404:
	 *         description: Usuario no encontrado
	 */
	.delete(
		'/:id',
		isAuthenticated,
		checkRole(['ADMIN']),
		userController.delete,
	);
