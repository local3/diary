# require '../utils/bool'
class ApplicationController < ActionController::API
  # APIモードでは、Cookieを有効にするために要記載 https://qiita.com/k_kind/items/e26f03f4e24551b46b98
  include ActionController::Cookies
  
  before_action :set_current_user

  rescue_from ActiveRecord::RecordInvalid, with: :render_422

  def render_422(e = nil)
    logger.debug('れんだー４２２')
    if e
      # logger.error e.inspect
      # logger.error e.class
      # logger.error e.message
      # logger.error e.record
      # logger.error e.record.errors
      # e.record.errors.each do |error|
      #   logger.debug error.inspect
      # end
      # logger.error e[:attribute].inspect
      # logger.error e.backtrace.join("\n")
    end
    return render status: 422, json: { msg: e, errors: e.record.errors }
    logger.debug "renderごえs"
  end

  # 記憶トークンcookieに対応するユーザーを返す
  def set_current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: user_id)
    elsif (user_id = cookies.signed[:user_id])
      user = User.find_by(id: user_id)
      if user && user.authenticated?(cookies[:remember_token])
        login(user)
        @current_user = user
      end
    end
  end

  def login(user)
    session[:user_id] = user.id
  end

  def remember(user)
    user.remember
    cookies.permanent.signed[:user_id] = user.id
    cookies.permanent[:remember_token] = user.remember_token
    logger.debug cookies.inspect
  end

  # 永続的セッションを破棄する
  def forget(user)
    user.forget
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
  end

  # 現在のユーザーをログアウトする
  def logout
    # なぜか@current_userに値が入らないので再定義
    # @current_user ||= User.find_by(id: session[:user_id])
    forget(@current_user)
    session.delete(:user_id)
    @current_user = nil
  end

  def logged_in?
    logger.debug("logged_in?")
    logger.debug(@current_user)
    # !@current_user.nil?
    !session[:user_id].nil?
    # true
  end

  private

      def require_login
        @current_user = User.find_by(id: session[:user_id])
        return if @current_user
    
        render json: { error: 'unauthorized' }, status: :unauthorized
      end

      def set_current_infos
        # cu=current_userの略
        @current_user = User.find_by(id: session[:user_id])
      end
end
