$(function() {
    getName()
    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度在1-6个字符之间'
            }
        }
    })

    // 重置
    $('#btnReset').on('click', function(e) {
            // 阻止表单重置事件
            e.preventDefault()
            getName()
        })
        // 监听表单提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('提交信息失败！')
                }
                layui.layer.msg('更新信息成功！')
                    // 更新父页面的欢迎信息 用window.parent
                window.parent.getUserInfo()
                    // console.log(res);
            }
        })
    })

})

function getName() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // console.log(res);
            layui.form.val('formuserInfo', res.data)
        }
    })
}