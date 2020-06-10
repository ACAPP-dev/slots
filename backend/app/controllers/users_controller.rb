class UsersController < ApplicationController
    
    def create
        
        user = User.new(user_params)
        if user.save
            session[:username] = params[:username]
            render json: user.to_json(only: [:id, :name, :username, :balance])
        else
            render json: {error: "Unable to Create User!"}, status: not_permitted
        end
    end

    def show
    
        if user = User.find_by(id: params[:id])
            trans = User.last_5_transactions(user)
        
            render json: trans.to_json(only: [:transaction_type, :amount, :created_at])
        else
            render json: {error: "Unable to get transactions"}, status: 404
        end
    end

    def update
        if user = User.find_by(id: params[:id])
            user.update(balance: params[:balance])
            render json: user.to_json(only: [:username, :balance])
        else
            render json: {error: "Unable to Update Balance!"}, status: 404
        end
    end

    def delete

    end

    private

    def user_params
        params.permit(:name, :username, :password)
    end
end
