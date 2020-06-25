class UsersController < ApplicationController
    
    def create
        @user = User.new(user_params)
        if @user.save
            session[:username] = params[:username]
            render json: @user
        else
            render json: {response: user.errors.messages.first}, status: 404
        end
    end

    def index
        @users = User.all 
        render json: @users
    end

    def show
       @user = User.find_by(id: params[:id])
       render json: @user
    end

    def update
        if @user = User.find_by(id: params[:id])
            @user.update(balance: params[:balance])
            render json: @user
        else
            render json: {response: "Unable to Update Balance!"}, status: 404
        end
    end

    def delete

    end

    private

    def user_params
        params.permit(:name, :username, :password)
    end
end
