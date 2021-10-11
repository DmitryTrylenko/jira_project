import { Schema, model } from 'mongoose';

interface Token {
	userID: string,
	token: string,
	_id: string,
}// might be moved to app/src/models

const TokenSchema = new Schema({
	userID: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
});

const TokenModel = model('token', TokenSchema);

export function findTokenByID(token: string): Promise<Token> {
	return TokenModel.findOne({ token }, { __v: 0 });
}

export function addToken(token: string, userID: string): Promise<Token> {
	return new TokenModel({ userID, token }).save();
}

export function updateToken(token: string, userID: string): Promise<Token> {
	return TokenModel.updateOne({ userID }, { token });
}

export function deleteToken(userID: string): Promise<Token> {
	return TokenModel.deleteOne({ userID });
}
