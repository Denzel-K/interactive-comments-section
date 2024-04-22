window.onload = () => {
  //Render reply field
  document.querySelectorAll('.get-reply').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
       // Find the corresponding reply-form-box
      const replyFormBox = button.closest('.comment-box').querySelector('.reply-form-box');

      // Toggle the visibility of the reply-form-box
      replyFormBox.classList.toggle('hidden');
    });
  });

  document.querySelectorAll('.get-reply-reply').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
       // Find the corresponding reply-form-box
      const replyFormBox = button.closest('.reply-flex').querySelector('.reply-reply-field');

      // Toggle the visibility of the reply-form-box
      replyFormBox.classList.toggle('hidden');
    });
  });

  //Add comment
  const add_desktop = document.querySelector('#add-comment-desktop');
  const add_mobile = document.querySelector('#add-comment-mobile');

  add_desktop.addEventListener('submit', async (e) => {
    e.preventDefault();

    const content = add_desktop.comment.value;
    const createdAt = new Date().toDateString();
    const count = 0;
    const user = {
      image: {
        png: "images/avatars/image-juliusomo.png",
        webp: "images/avatars/image-juliusomo.webp"
      },
      username: "juliusomo"
    }

    try {
      const res = await fetch('/createComment', {
        method: 'POST',
        body: JSON.stringify({ content, createdAt, count, user }),
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json();
      console.log (data);

      if (data.new_comment) {
        location.assign('/');
      }
    }
    catch(err) {
      console.log (err);
    }

  })

  add_mobile.addEventListener('submit', async (e) => {
    e.preventDefault();

    const content = add_mobile.comment.value;
    const createdAt = new Date().toDateString();
    const count = 0;
    const user = {
      image: {
        png: "images/avatars/image-juliusomo.png",
        webp: "images/avatars/image-juliusomo.webp"
      },
      username: "juliusomo"
    }
    const replies = []


    try {
      const res = await fetch('/createComment', {
        method: 'POST',
        body: JSON.stringify({ content, createdAt, count, user }),
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json();
      console.log (data);

      if (data.new_comment) {
        location.assign('/');
      }
    }
    catch(err) {
      console.log (err);
    }

  })

  //Make replies
  const comment_reply_desktop = document.querySelectorAll('.comment-reply-desktop');
  const comment_reply_mobile = document.querySelectorAll('.comment-reply-mobile');
  const reply_reply_desktop = document.querySelectorAll('.reply-reply-desktop');
  const reply_reply_mobile = document.querySelectorAll('.reply-reply-mobile');

  const count = 0;
  const createdAt = new Date().toDateString();
  const user = {
    image: {
      png: "images/avatars/image-juliusomo.png",
      webp: "images/avatars/image-juliusomo.webp"
    },
    username: "juliusomo"
  }

  async function replyToComment(content, createdAt, count, user, replyingTo, route){
    try {
      const res = await fetch(route, {
        method: 'POST',
        body: JSON.stringify({ content, createdAt, count, user, replyingTo }),
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json();
      //console.log (data);

      if (data.results) {
        location.assign('/');
      }
    }
    catch(err) {
      console.log (err);
    }
  }

  comment_reply_desktop.forEach(form => {
    form.addEventListener('submit', async (e)=> {
      e.preventDefault();

      const content = form.comment.value;
      const replyingTo = form.replyingTo.value;
      const route = '/createReply';

      replyToComment(content, createdAt, count, user, replyingTo, route);
    })
  })

  comment_reply_mobile.forEach(form => {
    form.addEventListener('submit', async (e)=> {
      e.preventDefault();

      const content = form.comment.value;
      const replyingTo = form.replyingTo.value;
      const route = '/createReply';

      replyToComment(content, createdAt, count, user, replyingTo, route);
    })
  })

  reply_reply_desktop.forEach(form => {
    form.addEventListener('submit', async (e)=> {
      e.preventDefault();

      const content = form.comment.value;
      const replyingTo = form.replyingTo.value;
      const route = '/replyToReply';

      replyToComment(content, createdAt, count, user, replyingTo, route);
    })
  })

  reply_reply_mobile.forEach(form => {
    form.addEventListener('submit', async (e)=> {
      e.preventDefault();

      const content = form.comment.value;
      const replyingTo = form.replyingTo.value;
      const route = '/replyToReply';

      replyToComment(content, createdAt, count, user, replyingTo, route);
    })
  })

  // Delete operations
  const show_delete_comment = document.querySelectorAll('.show-delete-comment');
  const show_delete_reply = document.querySelectorAll('.show-delete-reply');
  const show_delete_subreply = document.querySelectorAll('.show-delete-subreply');

  const comment_modal = document.querySelector('.comment_modal');
  const reply_modal = document.querySelector('.reply_modal');
  const subreply_modal = document.querySelector('.subreply_modal');

  const close_comment_modal = document.querySelector('.close-comment-modal');
  const close_reply_modal = document.querySelector('.close-reply-modal');
  const close_subreply_modal = document.querySelector('.close-subreply-modal');

  show_delete_comment.forEach(showBtn => {
    showBtn.addEventListener('click', ()=> {
      var commentId = showBtn.getAttribute('data-id');

      comment_modal.showModal();
      
      close_comment_modal.onclick = ()=> {
        comment_modal.close();
      }

      const delete_comment = document.querySelector('.delete-comment');
      delete_comment.onclick = async (e)=> {
        // Send a request to the server to delete the comment
        try {
          const res = await fetch(`/delete-comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
          });

          if (res.status === 200) {
              console.log('Comment deleted successfully');
              location.reload();
          } else {             
            console.error('Failed to delete comment');
          }
        }
        catch (err){
          console.log(err)
        }
      }
    })
  });

  show_delete_reply.forEach(showBtn => {
    showBtn.addEventListener('click', ()=> {
      var replyId = showBtn.getAttribute('data-id');

      reply_modal.showModal();
      
      close_reply_modal.onclick = ()=> {
        reply_modal.close();
      }

      const delete_reply = document.querySelector('.delete-reply');
      delete_reply.onclick = async (e)=> {
        // Send a request to the server to delete the reply
        try {
          const res = await fetch(`/delete-reply/${replyId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
          });

          if (res.status === 200) {
              console.log('reply deleted successfully');
              location.reload();
          } else {             
            console.error('Failed to delete reply');
          }
        }
        catch (err){
          console.log(err)
        }
      }
    })
  });

  show_delete_subreply.forEach(showBtn => {
    showBtn.addEventListener('click', ()=> {
      var subreplyId = showBtn.getAttribute('data-id');

      subreply_modal.showModal();
      
      close_subreply_modal.onclick = ()=> {
        subreply_modal.close();
      }

      const delete_subreply = document.querySelector('.delete-subreply');
      delete_subreply.onclick = async (e)=> {
        // Send a request to the server to delete the reply
        try {
          const res = await fetch(`/delete-subreply/${subreplyId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
          });

          if (res.status === 200) {
              console.log('reply deleted successfully');
              location.reload();
          } else {             
            console.error('Failed to delete reply');
          }
        }
        catch (err){
          console.log(err)
        }
      }
    })
  });


  //Update operations
  document.querySelectorAll('.edit-comment').forEach(edit_btn => {
    edit_btn.onclick = (e)=> {
      e.preventDefault();

      var contentData = edit_btn.closest('.comment-box').querySelector('.static-content').innerHTML;
      var id = edit_btn.getAttribute('data-id');

      const edit_form = `
          <form class="update-comment" method="POST">
            <div class="dynamic-content">
              <textarea name="contentUpdate" class="update_txt">${contentData}</textarea>
              <br>
              <div class="update-hold">
                <button type="submit" class="send-btn" id="update">
                  UPDATE
                </button>
              </div>
            </div>
          </form>
      `;

      const contentBodies = edit_btn.closest('.comment-box').querySelectorAll('.content-body');
      
      contentBodies.forEach(contentBody => {
        contentBody.innerHTML = edit_form;
      })

      const update_comment = document.querySelectorAll('.update-comment');        
      update_comment.forEach(form => {
        form.addEventListener('submit', async (event) => {

          event.preventDefault();
  
          const contents = document.querySelectorAll('.update_txt');

          var content;

          contents.forEach(content_data => {
            content = content_data.value;
            console.log(content);

            return content;
          });

          const createdAt = new Date().toDateString();
          const score = 0;
          const user = {
            image: {
              png: "images/avatars/image-juliusomo.png",
              webp: "images/avatars/image-juliusomo.webp"
            },
            username: "juliusomo"
          }
  
          try {
            const res = await fetch(`/updateComment/${id}`, {
              method: 'PUT',
              body: JSON.stringify({ content, createdAt, score, user }),
              headers: { 'Content-Type': 'application/json' }
            })
      
            const data = await res.json();
      
            if (data.commentUpdate) {
              location.reload();
            }
            else {
              alert("ERROR !")
            }
          }
          catch(err) {
            console.log (err);
          }
        })
      })
      

      edit_btn.onclick = (e)=> {
        e.preventDefault();

        contentBodies.forEach(contentBody => {
          contentBody.innerHTML = contentData;
          location.reload();
        })
      }
    }
  })

  document.querySelectorAll('.edit-reply').forEach(edit_btn => {
    edit_btn.onclick = (e)=> {
      e.preventDefault();

      var contentData = edit_btn.closest('.reply').querySelector('.static-content').innerHTML;
      var id = edit_btn.getAttribute('data-id');
      var reply_to = edit_btn.getAttribute('data-replyingTo');

      const edit_form = `
          <form class="update-reply" method="POST">
            <div class="dynamic-content">
              <textarea name="contentUpdate" class="update_txt">${contentData}</textarea>
              <br>
              <div class="update-hold">
                <button type="submit" class="send-btn" id="update">
                  UPDATE
                </button>
              </div>
            </div>
          </form>
      `;

      const contentBodies = edit_btn.closest('.reply').querySelectorAll('.content-body');
      
      contentBodies.forEach(contentBody => {
        contentBody.innerHTML = edit_form;
      })

      const update_reply = document.querySelectorAll('.update-reply');        
      update_reply.forEach(form => {
        form.addEventListener('submit', async (event) => {

          event.preventDefault();
  
          const contents = document.querySelectorAll('.update_txt');

          var content;

          contents.forEach(content_data => {
            content = content_data.value;
            console.log(content);

            return content;
          });

          const createdAt = new Date().toDateString();
          const score = 0;
          const replyingTo = reply_to;
          const user = {
            image: {
              png: "images/avatars/image-juliusomo.png",
              webp: "images/avatars/image-juliusomo.webp"
            },
            username: "juliusomo"
          }
  
          try {
            const res = await fetch(`/updateReply/${id}`, {
              method: 'PUT',
              body: JSON.stringify({ content, createdAt, score, user, replyingTo }),
              headers: { 'Content-Type': 'application/json' }
            })
      
            const data = await res.json();
      
            if (data.replyUpdate) {
              location.reload();
            }
            else {
              alert("ERROR !")
            }
          }
          catch(err) {
            console.log (err);
          }
        })
      })
      

      edit_btn.onclick = (e)=> {
        e.preventDefault();

        contentBodies.forEach(contentBody => {
          contentBody.innerHTML = contentData;
          location.reload();
        })
      }
    }
  })

  document.querySelectorAll('.edit-subreply').forEach(edit_btn => {
    edit_btn.onclick = (e)=> {
      e.preventDefault();

      var contentData = edit_btn.closest('.reply').querySelector('.static-content').innerHTML;
      var id = edit_btn.getAttribute('data-id');
      var reply_to = edit_btn.getAttribute('data-replyingTo');

      const edit_form = `
          <form class="update-reply" method="POST">
            <div class="dynamic-content">
              <textarea name="contentUpdate" class="update_txt">${contentData}</textarea>
              <br>
              <div class="update-hold">
                <button type="submit" class="send-btn" id="update">
                  UPDATE
                </button>
              </div>
            </div>
          </form>
      `;

      const contentBodies = edit_btn.closest('.reply').querySelectorAll('.content-body');
      
      contentBodies.forEach(contentBody => {
        contentBody.innerHTML = edit_form;
      })

      const update_reply = document.querySelectorAll('.update-reply');        
      update_reply.forEach(form => {
        form.addEventListener('submit', async (event) => {

          event.preventDefault();
  
          const contents = document.querySelectorAll('.update_txt');

          var content;

          contents.forEach(content_data => {
            content = content_data.value;
            console.log(content);

            return content;
          });

          const createdAt = new Date().toDateString();
          const score = 0;
          const replyingTo = reply_to;
          const user = {
            image: {
              png: "images/avatars/image-juliusomo.png",
              webp: "images/avatars/image-juliusomo.webp"
            },
            username: "juliusomo"
          }
  
          try {
            const res = await fetch(`/updateSubReply/${id}`, {
              method: 'PUT',
              body: JSON.stringify({ content, createdAt, score, user, replyingTo }),
              headers: { 'Content-Type': 'application/json' }
            })
      
            const data = await res.json();
      
            if (data.replyUpdate) {
              location.reload();
            }
            else {
              alert("ERROR !")
            }
          }
          catch(err) {
            console.log (err);
          }
        })
      })
      

      edit_btn.onclick = (e)=> {
        e.preventDefault();

        contentBodies.forEach(contentBody => {
          contentBody.innerHTML = contentData;
          location.reload();
        })
      }
    }
  })

  //Score increment and decrement
  const increment = document.querySelectorAll('.plus');
  const decrement = document.querySelectorAll('.minus');

  // Function to disable button
  function disableButton(button) {
    button.disabled = true;
  }

  // Function to enable button
  function enableButton(button) {
    button.disabled = false;
  }

  function incrementCounter(currentCount, route) {
    let currentValue = parseInt(currentCount.textContent);
    currentCount.textContent = currentValue + 1;
    const currentVal = currentCount.textContent;

    updateCounter(currentVal, route);
  }

  function decrementCounter(currentCount, route) {
    let currentValue = parseInt(currentCount.textContent);
    currentCount.textContent = currentValue - 1;
    const currentVal = currentCount.textContent;

    updateCounter(currentVal, route);
  }

  async function updateCounter(currentVal, route){
    try {
      const res = await fetch(route, {
        method: 'PUT',
        body: JSON.stringify({ currentVal }),
        headers: { 'Content-Type': 'application/json' }
      })
    }
    catch(err){
      console.log(err);
    }
  }

  increment.forEach(plus => {
    plus.addEventListener('click', ()=> {
      const currentCount = plus.closest('.count').querySelector('.count-value');
      const route = plus.closest('.count').getAttribute('data-route');

      incrementCounter(currentCount, route);
    })
  })

  decrement.forEach(minus => {
    minus.addEventListener('click', ()=> {
      const currentCount = minus.closest('.count').querySelector('.count-value');
      const route = minus.closest('.count').getAttribute('data-route');

      decrementCounter(currentCount, route);
    })
  })
}