class ProfileController < ApplicationController
  def index
    @user = current_user
    @last_log = Log.last.created_at
  end
  def show
    @user = User.find(params[:id])
    @last_log = Log.last.created_at
  end
end
