class SessionsController < ApplicationController

    def create
        if user = User.find_by(username: user_params[:username])
            if user.authenticate(user_params[:password])
                session[:username] = params[:username]
                render json: user.to_json(only: [:id, :name, :username, :balance])
            else
                # byebug
                render json: {response: "Password does not match!"}, status: 403
            end
        else
            render json: {response: "Username not found!"}, status: 404
        end
    end

    def destroy

    end
end

private

def user_params
    params.require(:session).permit(:username, :password)
end