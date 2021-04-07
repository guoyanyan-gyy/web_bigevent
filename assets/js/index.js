$(function() {
        getUserInfo()
        var layer = layui.layer
        $('#btnLogout').on('click', function() {
            layer.confirm('是否退出?', { icon: 3, title: '提示' }, function(index) {
                // 清空原有的token
                localStorage.removeItem('token')
                location.href = '/login.html'

                layer.close(index);
            });
        })
    })
    // 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)

        },
        complete: function(res) {
            console.log(res.responseJSON);
        }
    })
}

function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎' + name)
        //按需渲染用户的头像
        //图片头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
    //文本头像
    else {
        $('.layui-nav-img').hide()
            //获取第一个字符
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }


}