class SessionsController < ApplicationController

    def create
        
        if user = User.find_by(username: user_params[:username])
            if user.authenticate(user_params[:password])
                session[:username] = params[:username]
                render json: user, status: :ok
            else
                render json: {error: "Password does not match!"}, status: not_found
            end
        else
            render json: {
                status: 404,
                error: not_found,
                message: "Username not found"}, status: 404
        end
        render json: {response: "User Logged In!"}
    end

    def destroy

    end
end

private

def user_params
    params.require(:session).permit(:username, :password)
end