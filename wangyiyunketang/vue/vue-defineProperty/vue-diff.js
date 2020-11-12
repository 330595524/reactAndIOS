// 比对差别

patchVnode(oldVnode,vnode){
    const el = vnode.el = oldVnode.el;
    let i,oldCh = oldVnode.children,ch = vnode.children;
    if(oldVnode === vnode) {
        return
    }
    if(oldVnode.text !==null&& vnode.text!==null&& oldVnode.text !== vnode.text){
        api.setTextContent(el,vnode,text);
    }else{
        updtateEle(el,vnode,oldVnode);
        if(oldCh&&tch&&oldCh!==tch){
            updtateChildren();
        }else if(ch){
            creteEle(vnode);
        }else if(oldCh){
            api.removerChildren(el);
        }
    }


}