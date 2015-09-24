//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.hnreact;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.drawee.controller.AbstractDraweeControllerBuilder;
import com.facebook.react.uimanager.CSSColorUtil;
import com.facebook.react.uimanager.CatalystStylesDiffMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIProp;
import com.facebook.react.uimanager.UIProp.Type;
import com.facebook.react.views.image.ImageResizeMode;
import com.facebook.react.views.image.ReactImageView;
import javax.annotation.Nullable;

public class TestManager extends SimpleViewManager<ReactImageView> {
    public static final String REACT_CLASS = "RCTTestView";
    @UIProp(Type.STRING)
    public static final String PROP_SRC = "src";
    @UIProp(Type.NUMBER)
    public static final String PROP_BORDER_RADIUS = "borderRadius";
    @UIProp(Type.STRING)
    public static final String PROP_RESIZE_MODE = "resizeMode";
    private static final String PROP_TINT_COLOR = "tintColor";
    @Nullable
    private final AbstractDraweeControllerBuilder mDraweeControllerBuilder;
    @Nullable
    private final Object mCallerContext;

    public String getName() {
        return REACT_CLASS;
    }

    public TestManager(AbstractDraweeControllerBuilder draweeControllerBuilder, Object callerContext) {
        this.mDraweeControllerBuilder = draweeControllerBuilder;
        this.mCallerContext = callerContext;
    }

    public TestManager() {
        this.mDraweeControllerBuilder = null;
        this.mCallerContext = null;
    }

    public ReactImageView createViewInstance(ThemedReactContext context) {
        return new ReactImageView(context, (AbstractDraweeControllerBuilder)(this.mDraweeControllerBuilder == null?Fresco.newDraweeControllerBuilder():this.mDraweeControllerBuilder), this.mCallerContext);
    }

    public void updateView(ReactImageView view, CatalystStylesDiffMap props) {
        super.updateView(view, props);
        if(props.hasKey("resizeMode")) {
            view.setScaleType(ImageResizeMode.toScaleType(props.getString("resizeMode")));
        }

        if(props.hasKey("src")) {
            view.setSource(props.getString("src"));
        }

        if(props.hasKey("borderRadius")) {
            view.setBorderRadius(props.getFloat("borderRadius", 0.0F));
        }

        if(props.hasKey("tintColor")) {
            String tintColorString = props.getString("tintColor");
            if(tintColorString == null) {
                view.clearColorFilter();
            } else {
                view.setColorFilter(CSSColorUtil.getColor(tintColorString));
            }
        }

        view.maybeUpdateView();
    }
}
