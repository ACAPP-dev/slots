class SessionsController < ApplicationController

    def create
        
        if user = User.find_by(username: user_params[:username])
            if user.authenticate(user_params[:password])
                session[:username] = params[:username]
                # byebug
                render json: user.to_json(only: [:name, :username, :balance])
            else
                render json: {error: "Password does not match!"}, status: not_found
            end
        else
            render json: {response: "Username not found"}, status: 404
        end
    end

    def destroy

    end
end

private

def user_params
    params.require(:session).permit(:username, :password)
end