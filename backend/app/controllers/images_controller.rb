class ImagesController < ApplicationController

    def index
        images = Images.all
        render json: images.to_json(:only => [:name, :source])
end
