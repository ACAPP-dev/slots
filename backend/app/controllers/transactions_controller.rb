class TransactionsController < ApplicationController
    def create
        byebug
    end

    def index

    end

    private

    def trans_params
        params.permit([:username, :transaction_type, :amount])

    end
end
