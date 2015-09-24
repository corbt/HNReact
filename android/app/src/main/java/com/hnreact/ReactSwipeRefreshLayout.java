package com.hnreact;

import android.content.Context;
import android.support.annotation.Nullable;
import android.support.v4.widget.SwipeRefreshLayout;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;

import com.facebook.react.uimanager.MeasureSpecAssertions;
import com.facebook.react.uimanager.events.NativeGestureUtil;

/**
 * Created by kyle on 9/23/15.
 */
public class ReactSwipeRefreshLayout extends SwipeRefreshLayout {
    private @Nullable OnSizeChangedListener mOnSizeChangedListener;

    public ReactSwipeRefreshLayout(Context context) {
        super(context);
    }

    public ReactSwipeRefreshLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public static interface OnSizeChangedListener {
        void onSizeChanged(int width, int height, int oldWidth, int oldHeight);
    }


//    public ReactSwipeRefreshLayout(Context context, AttributeSet attrs, int defStyle) {
//        super(context, attrs, defStyle);
//    }

    public void setOnSizeChangedListener(OnSizeChangedListener onSizeChangedListener) {
        mOnSizeChangedListener = onSizeChangedListener;
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);

        if (mOnSizeChangedListener != null) {
            mOnSizeChangedListener.onSizeChanged(w, h, oldw, oldh);
        }
    }

//    @Override
//    public boolean onInterceptTouchEvent(MotionEvent ev) {
//        if (super.onInterceptTouchEvent(ev)) {
//            Log.d("test", "super says yes");
//            NativeGestureUtil.notifyNativeGestureStarted(this, ev);
//            return true;
//        }
//
//        Log.d("test", "super says no");
//        return false;
//    }

//    @Override
//    public void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
//        MeasureSpecAssertions.assertExplicitMeasureSpec(widthMeasureSpec, heightMeasureSpec);
//
//        setMeasuredDimension(
//                MeasureSpec.getSize(widthMeasureSpec),
//                MeasureSpec.getSize(heightMeasureSpec));
//    }
//    @Override
//    public boolean onInterceptTouchEvent(MotionEvent ev) {
//        Log.d("test", "got an intereception!");
//        return super.onInterceptTouchEvent(ev);
//        return false;
//    }
//
//    @Override
//    public boolean onTouchEvent(MotionEvent ev) {
//        Log.d("test", "got an event!");
//        return super.onTouchEvent(ev);
//        return false;
//    }

    //    @Override
//    public boolean canChildScrollUp() {
//        if( target == null )
//            return super.canChildScrollUp();
//
//        return target.canScrollVertically(-1);
//    }

}
