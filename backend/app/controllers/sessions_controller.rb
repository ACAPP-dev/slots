class SessionsController < ApplicationController

    def create
        
        if user = User.find_by(username: user_params[:username])
            if user.authenticate(user_params[:password])
                session[:username] = params[:username]
            else
                render json: {error: "Password does not match!"}
            end
        else
            render json: {error: "Username not found"}
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