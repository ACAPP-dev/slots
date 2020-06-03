class ImagesController < ApplicationController

    def index
        images = Image.all
        render json: images.to_json(:only => [:id, :name, :source, :win_code])
    end
end
