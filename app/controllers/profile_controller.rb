class ProfileController < ApplicationController
  def index
  end
  def show
    @user = User.find(params[:id])
    @last_log = Log.last.created_at
  end
end
